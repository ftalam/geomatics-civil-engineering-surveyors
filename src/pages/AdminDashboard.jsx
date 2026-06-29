import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Bell, 
  Package, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Search,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Hash,
  MessageSquare,
  Filter,
  XCircle,
  Check,
  Zap,
  Shield,
  Users,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ORDER_STATUSES = ["pending", "approved"];
const STATUS_LABELS = {
  pending: "Pending Review",
  approved: "Approved",

  
};

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-purple-50 text-purple-700 border-purple-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_ICONS = {
  pending: Clock,
  approved: CheckCircle,
  processing: Loader2,
  completed: Check,
  cancelled: XCircle
};

const NEED_LABELS = {
  buy: "Buying",
  rent: "Renting",
  "buy-rent": "Either (buy/rent)",
  "not-sure": "Not sure",
};

const POLLING_INTERVAL = 30000;
const MAX_NOTIFICATIONS = 50;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getProfileFromOrder = (order) => {
  if (!order?.profiles) return null;
  if (Array.isArray(order.profiles)) return order.profiles[0] || null;
  return order.profiles;
};

const attachProfilesToOrders = async (orderData) => {
  const safeOrders = Array.isArray(orderData) ? orderData : [];
  if (!safeOrders.length) return [];

  const userIds = [...new Set(safeOrders.map(order => order?.user_id).filter(Boolean))];
  if (!userIds.length) return safeOrders;

  const { data: profilesData, error } = await supabase
    .from("profiles")
    .select("id, email, phone, full_name, avatar_url")
    .in("id", userIds);

  if (error) {
    console.warn("Failed to load order profiles:", error);
    return safeOrders;
  }

  const profilesById = {};
  (profilesData || []).forEach(profile => {
    profilesById[profile.id] = profile;
  });

  return safeOrders.map(order => ({
    ...order,
    profiles: profilesById[order.user_id] || getProfileFromOrder(order),
  }));
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const calculateItemTotal = (item) => (item.price || 0) * (item.quantity || 1);

const parseJsonValue = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try { return JSON.parse(trimmed); } 
    catch { return value; }
  }
  return value;
};

const normalizeOrderRequests = (order) => {
  const sources = [
    order?.special_requests,
    order?.specialRequests,
    order?.request_details,
    order?.requestDetails,
    order?.metadata?.special_requests,
    order?.metadata?.specialRequests,
  ];

  const entries = [];
  const seen = new Set();

  sources.forEach(source => {
    const parsed = parseJsonValue(source);
    if (!parsed) return;

    if (typeof parsed === "string") {
      const key = `Message:${parsed}`;
      if (!seen.has(key)) {
        seen.add(key);
        entries.push({ label: "Message", value: parsed });
      }
      return;
    }

    if (typeof parsed === "object" && !Array.isArray(parsed)) {
      Object.entries(parsed).forEach(([key, value]) => {
        const parsedValue = parseJsonValue(value);
        const normalizedValue = parsedValue && typeof parsedValue === "object"
          ? JSON.stringify(parsedValue)
          : String(parsedValue ?? "").trim();
        
        if (normalizedValue) {
          const entryKey = `${key}:${normalizedValue}`;
          if (!seen.has(entryKey)) {
            seen.add(entryKey);
            const label = key
              .replace(/[_-]+/g, " ")
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .replace(/\b\w/g, letter => letter.toUpperCase());
            entries.push({ label, value: normalizedValue });
          }
        }
      });
    }
  });

  // Add direct fields
  [
    ["Message", order?.message],
    ["Message", order?.order_message],
    ["Notes", order?.notes],
  ].forEach(([label, value]) => {
    const normalizedValue = String(value ?? "").trim();
    if (normalizedValue) {
      const key = `${label}:${normalizedValue}`;
      if (!seen.has(key)) {
        seen.add(key);
        entries.push({ label, value: normalizedValue });
      }
    }
  });

  return entries;
};

const getOrderNeed = (order) => {
  const request = normalizeOrderRequests(order).find(({ label }) => {
    const normalizedLabel = label.toLowerCase().replace(/\s+/g, "");
    return normalizedLabel === "buyrent";
  });

  return String(request?.value ?? "").trim();
};

const getNeedLabel = (need) => {
  const normalizedNeed = String(need ?? "").trim();
  return NEED_LABELS[normalizedNeed] || normalizedNeed;
};

const normalizeOrderId = (value) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("order_")) {
    return value.slice("order_".length);
  }
  return value;
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const getOrderTotal = (order) => {
  if (order.total_amount) return order.total_amount;
  if (Array.isArray(order.items)) {
    return order.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }
  return 0;
};

// ============================================================================
// REDUCER
// ============================================================================

const initialState = {
  orders: [],
  loading: true,
  error: null,
  notifications: [],
  updatingOrderId: null,
  lastUpdate: new Date(),
  filters: {
    status: "all",
    need: "all",
    search: "",
    dateRange: "all",
    sortBy: "newest",
  },
  selectedOrderId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload, loading: false, error: null };
    
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        lastUpdate: new Date(),
      };
    
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? { ...order, ...action.payload } : order
        ),
        updatingOrderId: null,
        lastUpdate: new Date(),
      };
    
    case "REMOVE_ORDER":
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
        lastUpdate: new Date(),
      };
    
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, MAX_NOTIFICATIONS),
      };
    
    case "MARK_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };
    
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    
    case "SET_UPDATING":
      return { ...state, updatingOrderId: action.payload };
    
    case "SET_LAST_UPDATE":
      return { ...state, lastUpdate: action.payload };
    
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case "SET_SELECTED_ORDER":
      return { ...state, selectedOrderId: action.payload };
    
    default:
      return state;
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-slate-200 rounded-xl" />
            <div>
              <div className="h-8 w-48 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-slate-200 rounded-xl" />
            <div className="h-10 w-32 bg-slate-200 rounded-xl" />
          </div>
        </div>
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Header = ({
  onBack,
  lastUpdate,
  onRefresh,
  refreshing,
  notifications,
  unreadCount,
  showNotifications,
  onToggleNotifications,
  onClearNotifications,
  notificationRef,
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2.5 bg-white rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-slate-600" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="h-6 w-6 text-indigo-600" />
          Order Management
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-slate-500">
            Last updated {formatTimeAgo(lastUpdate)}
          </p>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-3 w-3 text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onRefresh}
        disabled={refreshing}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-sm font-medium text-slate-600 shadow-sm"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        Refresh
      </button>

      <div className="relative" ref={notificationRef}>
        <button
          onClick={onToggleNotifications}
          className="relative flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
        >
          <Bell className="h-4 w-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-600 hidden sm:inline">Alerts</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white rounded-full text-xs flex items-center justify-center font-medium animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-slate-800">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearNotifications}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="max-h-[32rem] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No notifications yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    New order updates will appear here
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-slate-50 last:border-b-0 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.type === 'success' ? 'bg-emerald-500' :
                        notification.type === 'error' ? 'bg-rose-500' :
                        notification.type === 'warning' ? 'bg-amber-500' :
                        'bg-indigo-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-800">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-indigo-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const FiltersBar = ({ filters, onFilterChange, totalResults }) => (
  <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-slate-200">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search orders by number, email, or name..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-slate-700 transition-all"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 transition-all"
      >
        <option value="all">All Statuses</option>
        {ORDER_STATUSES.map(status => (
          <option key={status} value={status}>
            {STATUS_LABELS[status] || status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={filters.need}
        onChange={(e) => onFilterChange({ need: e.target.value })}
        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 transition-all"
      >
        <option value="all">All Needs</option>
        {Object.entries(NEED_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => onFilterChange({ dateRange: e.target.value })}
        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 transition-all"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => onFilterChange({ sortBy: e.target.value })}
        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 transition-all"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        
      </select>
    </div>

    <div className="mt-3 flex items-center justify-between">
      <span className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{totalResults}</span> {totalResults === 1 ? "order" : "orders"}
      </span>
      {(filters.status !== "all" || filters.need !== "all" || filters.dateRange !== "all" || filters.search) && (
        <button
          onClick={() => onFilterChange({ status: "all", need: "all", dateRange: "all", search: "" })}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
          <XCircle className="h-4 w-4" />
          Clear filters
        </button>
      )}
    </div>
  </div>
);

const EmptyState = ({ hasFilters, onClearFilters }) => (
  <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Package className="h-10 w-10 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">No orders found</h3>
    <p className="text-slate-500 max-w-sm mx-auto">
      {hasFilters
        ? "No orders match your current filters. Try adjusting your search criteria."
        : "Orders will appear here once they're created."}
    </p>
    {hasFilters && (
      <button
        onClick={onClearFilters}
        className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm inline-flex items-center gap-1"
      >
        <Filter className="h-4 w-4" />
        Clear all filters
      </button>
    )}
  </div>
);

const OrderCard = ({ 
  order, 
  isUpdating, 
  isExpanded, 
  onToggleExpand, 
  onUpdateStatus 
}) => {
  const profile = getProfileFromOrder(order);
  const status = ORDER_STATUSES.includes(order.status) ? order.status : "pending";
  const statusStyle = STATUS_STYLES[status] || "bg-slate-100 text-slate-700 border-slate-200";
  const StatusIcon = STATUS_ICONS[status] || Package;
  const orderItems = Array.isArray(order.items) ? order.items : [];
  const orderRequests = normalizeOrderRequests(order);
  const orderNeed = getOrderNeed(order);
  const total = getOrderTotal(order);

  return (
    <div
      id={`order-${order.id}`}
      className={`bg-white rounded-2xl border shadow-sm transition-all duration-300 ${
        isUpdating ? 'opacity-60 border-slate-200' : 'border-slate-200 hover:shadow-md'
      } ${isExpanded ? 'ring-2 ring-indigo-500 shadow-lg' : ''}`}
    >
      <div className="p-6 cursor-pointer" onClick={onToggleExpand}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-xl ${statusStyle.split(' ')[0]} flex-shrink-0`}>
              <StatusIcon className={`h-6 w-6 ${statusStyle.split(' ')[1]}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  Order #{order.order_number || order.id.slice(0, 8)}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyle}`}>
                  {STATUS_LABELS[status] || status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>

              {profile && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {profile.full_name && (
                    <p className="text-sm text-slate-600 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{profile.full_name}</span>
                    </p>
                  )}
                  {profile.email && (
                    <p className="text-sm text-slate-600 flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {profile.email}
                    </p>
                  )}
                  {profile.phone && (
                    <p className="text-sm text-slate-600 flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {profile.phone}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.created_at)}
                </span>
                {orderRequests.length > 0 && (
                  <span className="flex items-center gap-1 text-indigo-600">
                    <MessageSquare className="h-3 w-3" />
                    {orderRequests.length} message{orderRequests.length > 1 ? 's' : ''}
                  </span>
                )}
                {orderNeed && (
                  <span className="flex items-center gap-1 text-slate-600">
                    Need: <span className="font-medium">{getNeedLabel(orderNeed)}</span>
                  </span>
                )}
                {orderItems.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {orderItems.length} item{orderItems.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>

       
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100 p-6 bg-slate-50 rounded-b-2xl animate-fade-in">
          {orderRequests.length > 0 && (
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                Customer Messages
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {orderRequests.map((request, index) => (
                  <div
                    key={`${request.label}-${index}`}
                    className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                      {request.label}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap break-words">
                      {request.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {orderItems.length > 0 && (
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Package className="h-4 w-4 text-indigo-600" />
                Order Items
              </h4>
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Hash className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">{item.name}</p>
                        <p className="text-sm text-slate-500">
                          {formatCurrency(item.price)} × {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-800 ml-4 flex-shrink-0">
                      {formatCurrency(calculateItemTotal(item))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Update Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUSES.map((newStatus) => {
                const style = STATUS_STYLES[newStatus] || "bg-slate-100 text-slate-700 border-slate-200";
                const Icon = STATUS_ICONS[newStatus] || CheckCircle;
                const isActive = order.status === newStatus;
                return (
                  <button
                    key={newStatus}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateStatus(order.id, newStatus);
                    }}
                    disabled={isUpdating || isActive}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${style} ${
                      isActive ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105' : ''
                    } ${isUpdating || isActive ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 hover:shadow-md'}`}
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    {STATUS_LABELS[newStatus] || newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
                    {isActive && <Check className="h-3 w-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const pollingRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch orders
  const fetchOrders = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) dispatch({ type: "SET_LOADING", payload: true });

      const { data: orderData, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      const ordersWithProfiles = await attachProfilesToOrders(orderData || []);
      dispatch({ type: "SET_ORDERS", payload: ordersWithProfiles });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      dispatch({ type: "SET_ERROR", payload: message });
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders");
    }
  }, []);

  // Update order status
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    const normalizedId = normalizeOrderId(orderId);
    
    if (!normalizedId) {
      toast.error("Invalid order ID");
      return;
    }

    if (!ORDER_STATUSES.includes(newStatus)) {
      toast.error("Invalid status");
      return;
    }

    // Optimistic update
    dispatch({ type: "SET_UPDATING", payload: normalizedId });
    const previousOrders = [...state.orders];
    
    dispatch({
      type: "UPDATE_ORDER",
      payload: { id: normalizedId, status: newStatus },
    });

    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", normalizedId)
        .select("id, order_number, status")
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        dispatch({ type: "SET_ORDERS", payload: previousOrders });
        toast.error("Order not found or access denied");
        await fetchOrders(false);
        return;
      }

      const orderLabel = data.order_number ? `#${data.order_number}` : normalizedId;
      toast.success(`Order ${orderLabel} updated to ${STATUS_LABELS[newStatus] || newStatus}`);
      
      // Add notification for status change
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: generateId(),
          type: "success",
          message: `Order ${orderLabel} status changed to ${STATUS_LABELS[newStatus] || newStatus}`,
          orderId: normalizedId,
          timestamp: new Date().toISOString(),
          read: false,
        },
      });
      
      await fetchOrders(false);
    } catch (err) {
      dispatch({ type: "SET_ORDERS", payload: previousOrders });
      const message = err instanceof Error ? err.message : "Failed to update order";
      toast.error(message);
      console.error("Error updating order:", err);
    } finally {
      dispatch({ type: "SET_UPDATING", payload: null });
    }
  }, [state.orders, fetchOrders]);

  // Setup realtime and polling
  useEffect(() => {
    fetchOrders();

    const ordersChannel = supabase
      .channel("admin-orders-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        async (payload) => {
          const [newOrder] = await attachProfilesToOrders([payload.new]);
          
          if (newOrder) {
            dispatch({ type: "ADD_ORDER", payload: newOrder });
            const orderLabel = payload.new.order_number ? `#${payload.new.order_number}` : payload.new.id;
            dispatch({
              type: "ADD_NOTIFICATION",
              payload: {
                id: generateId(),
                type: "success",
                message: `🆕 New order ${orderLabel} received`,
                orderId: payload.new.id,
                timestamp: new Date().toISOString(),
                read: false,
              },
            });
            
            toast.success(`🎉 New order ${orderLabel} received!`, {
              duration: 5000,
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        async (payload) => {
          const [updatedOrder] = await attachProfilesToOrders([payload.new]);
          
          if (updatedOrder) {
            dispatch({ type: "UPDATE_ORDER", payload: updatedOrder });
            
            if (payload.new.status !== payload.old.status) {
              const orderLabel = payload.new.order_number ? `#${payload.new.order_number}` : payload.new.id;
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: generateId(),
                  type: "info",
                  message: `📝 Order ${orderLabel} status: ${STATUS_LABELS[payload.new.status] || payload.new.status}`,
                  orderId: payload.new.id,
                  timestamp: new Date().toISOString(),
                  read: false,
                },
              });
            }
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => {
          dispatch({ type: "REMOVE_ORDER", payload: payload.old.id });
          const orderLabel = payload.old.order_number ? `#${payload.old.order_number}` : payload.old.id;
          
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: generateId(),
              type: "warning",
              message: `🗑️ Order ${orderLabel} was deleted`,
              orderId: payload.old.id,
              timestamp: new Date().toISOString(),
              read: false,
            },
          });
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel("admin-profiles-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          fetchOrders(false);
        }
      )
      .subscribe();

    pollingRef.current = setInterval(() => {
      fetchOrders(false);
    }, POLLING_INTERVAL);

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(profilesChannel);
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [fetchOrders]);

  // Memoized computations
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...state.orders];

    // Apply status filter
    if (state.filters.status !== "all") {
      filtered = filtered.filter(order => order.status === state.filters.status);
    }

    // Apply need filter
    if (state.filters.need !== "all") {
      filtered = filtered.filter(order => getOrderNeed(order) === state.filters.need);
    }

    // Apply search filter
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter(order => {
        const profile = getProfileFromOrder(order);
        const orderNumber = String(order.order_number || "").toLowerCase();
        const email = (profile?.email || "").toLowerCase();
        const phone = (profile?.phone || "").toLowerCase();
        const name = (profile?.full_name || "").toLowerCase();
        const requestText = normalizeOrderRequests(order)
          .map(req => `${req.label} ${req.value}`)
          .join(" ")
          .toLowerCase();
        
        return (
          orderNumber.includes(searchLower) ||
          email.includes(searchLower) ||
          phone.includes(searchLower) ||
          name.includes(searchLower) ||
          requestText.includes(searchLower)
        );
      });
    }

    // Apply date range filter
    if (state.filters.dateRange !== "all") {
      const now = new Date();
      const ranges = {
        today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        month: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
        quarter: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
      };
      
      filtered = filtered.filter(order => {
        return new Date(order.created_at) >= ranges[state.filters.dateRange];
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (state.filters.sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "highest":
          return getOrderTotal(b) - getOrderTotal(a);
        case "lowest":
          return getOrderTotal(a) - getOrderTotal(b);
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.orders, state.filters]);

  const unreadNotificationsCount = useMemo(() => {
    return state.notifications.filter(n => !n.read).length;
  }, [state.notifications]);

  // Handlers
  const handleManualRefresh = () => {
    fetchOrders(false);
    toast.success("🔄 Orders refreshed");
  };

  const handleClearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
    toast.success("Notifications cleared");
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      dispatch({ type: "MARK_NOTIFICATIONS_READ" });
    }
  };

  // Render loading skeleton
  if (state.loading && !state.orders.length) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header
          onBack={() => navigate(-1)}
          lastUpdate={state.lastUpdate}
          onRefresh={handleManualRefresh}
          refreshing={state.loading}
          notifications={state.notifications}
          unreadCount={unreadNotificationsCount}
          showNotifications={showNotifications}
          onToggleNotifications={handleToggleNotifications}
          onClearNotifications={handleClearNotifications}
          notificationRef={notificationRef}
        />

        {/* Error Banner */}
        {state.error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-rose-800">Error Loading Orders</h3>
              <p className="text-sm text-rose-600 mt-1">{state.error}</p>
            </div>
            <button
              onClick={handleManualRefresh}
              className="text-sm text-rose-600 hover:text-rose-800 font-medium whitespace-nowrap"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <FiltersBar
          filters={state.filters}
          onFilterChange={(updates) => dispatch({ type: "SET_FILTERS", payload: updates })}
          totalResults={filteredAndSortedOrders.length}
        />

        {/* Orders List */}
        <div className="space-y-4">
          {filteredAndSortedOrders.length === 0 ? (
            <EmptyState
              hasFilters={
                state.filters.status !== "all" ||
                state.filters.need !== "all" ||
                state.filters.dateRange !== "all" ||
                !!state.filters.search
              }
              onClearFilters={() =>
                dispatch({
                  type: "SET_FILTERS",
                  payload: {
                    status: "all",
                    need: "all",
                    dateRange: "all",
                    search: "",
                  },
                })
              }
            />
          ) : (
            filteredAndSortedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isUpdating={state.updatingOrderId === order.id}
                isExpanded={state.selectedOrderId === order.id}
                onToggleExpand={() => dispatch({ 
                  type: "SET_SELECTED_ORDER", 
                  payload: state.selectedOrderId === order.id ? null : order.id 
                })}
                onUpdateStatus={updateOrderStatus}
              />
            ))
          )}
        </div>

        {/* Footer Stats */}
        {filteredAndSortedOrders.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-6">
                <span>
                  Total: <span className="font-semibold text-slate-700">{filteredAndSortedOrders.length}</span>
                </span>
                <span>
                  Pending: <span className="font-semibold text-amber-600">
                    {filteredAndSortedOrders.filter(o => o.status === "pending").length}
                  </span>
                </span>
                <span>
                  Approved: <span className="font-semibold text-emerald-600">
                    {filteredAndSortedOrders.filter(o => o.status === "approved").length}
                  </span>
                </span>
                <span className="hidden sm:inline">
                  Total Value: <span className="font-semibold text-slate-700">
                    {formatCurrency(filteredAndSortedOrders.reduce((sum, o) => sum + getOrderTotal(o), 0))}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-slate-400">Live updates enabled</span>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

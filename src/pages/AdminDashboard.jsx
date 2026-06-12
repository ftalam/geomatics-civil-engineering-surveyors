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
  X,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Calendar,
  Hash
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ORDER_STATUSES = ["pending", "approved"];

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  approved: "bg-green-100 text-green-700 border border-green-200",
};

const POLLING_INTERVAL = 30000; // 30 seconds

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getProfileFromOrder = (order) => {
  if (!order?.profiles) return null;
  if (Array.isArray(order.profiles)) {
    return order.profiles[0] || null;
  }
  return order.profiles;
};

const attachProfilesToOrders = async (orderData) => {
  const safeOrders = Array.isArray(orderData) ? orderData : [];
  
  if (!safeOrders.length) return [];

  // Get unique user IDs
  const userIds = [...new Set(
    safeOrders
      .map((order) => order?.user_id)
      .filter(Boolean)
  )];

  if (!userIds.length) return safeOrders;

  // Fetch profiles
  const { data: profilesData, error } = await supabase
    .from("profiles")
    .select("id, email, phone")
    .in("id", userIds);

  if (error) {
    console.warn("Failed to load order profiles:", error);
    return safeOrders;
  }

  // Create lookup map
  const profilesById = {};
  (profilesData || []).forEach((profile) => {
    profilesById[profile.id] = profile;
  });

  // Attach profiles to orders
  return safeOrders.map((order) => ({
    ...order,
    profiles: profilesById[order.user_id] || getProfileFromOrder(order),
  }));
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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

const calculateItemTotal = (item) => {
  return (item.price || 0) * (item.quantity || 1);
};

const normalizeOrderId = (value) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("order_")) {
    return value.slice("order_".length);
  }
  return value;
};

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const logMissingProfiles = (orders) => {
  const missingProfiles = orders.filter(order => {
    const profile = getProfileFromOrder(order);
    return !profile;
  });
  
  if (missingProfiles.length > 0) {
    console.warn(`${missingProfiles.length} orders missing profiles:`, 
      missingProfiles.map(o => ({
        orderId: o.id,
        orderNumber: o.order_number,
        userId: o.user_id,
        status: o.status
      }))
    );
  }
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
    search: "",
    dateRange: "all",
    sortBy: "newest",
  },
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
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, ...action.payload } : order
        ),
        updatingOrderId: null,
        lastUpdate: new Date(),
      };
    
    case "REMOVE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
        lastUpdate: new Date(),
      };
    
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 50),
      };
    
    case "MARK_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    
    case "SET_UPDATING":
      return { ...state, updatingOrderId: action.payload };
    
    case "SET_LAST_UPDATE":
      return { ...state, lastUpdate: action.payload };
    
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    default:
      return state;
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-lg" />
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded-lg" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl" />
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
        className="p-2 hover:bg-white rounded-xl transition-all duration-200 hover:shadow-sm"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">
            Last updated {formatTimeAgo(lastUpdate)}
          </p>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-3 w-3 text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onRefresh}
        disabled={refreshing}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        Refresh
      </button>

      <div className="relative" ref={notificationRef}>
        <button
          onClick={onToggleNotifications}
          className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
        >
          <Bell className="h-4 w-4" />
          <span className="text-sm font-medium hidden sm:inline">Notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearNotifications}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="max-h-[32rem] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No notifications yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    New order updates will appear here
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-2 w-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'error' ? 'bg-red-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
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

const StatsGrid = ({ stats }) => {
  const statCards = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: Package,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 ${stat.bgColor} opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500`} />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
            
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            
            {stat.label === "Revenue" && stats.total > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Avg. order: {formatCurrency(stats.averageOrderValue)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const FiltersBar = ({ filters, onFilterChange, totalResults }) => (
  <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-200">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order number, email, or name..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => onFilterChange({ dateRange: e.target.value })}
        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => onFilterChange({ sortBy: e.target.value })}
        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Value</option>
        <option value="lowest">Lowest Value</option>
      </select>
    </div>

    <div className="mt-3 text-sm text-gray-500">
      Showing {totalResults} {totalResults === 1 ? "order" : "orders"}
    </div>
  </div>
);

const EmptyState = ({ hasFilters, onClearFilters }) => (
  <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
    <p className="text-gray-500 mb-4">
      {hasFilters
        ? "No orders match your current filters. Try adjusting your search criteria."
        : "Orders will appear here once they're created."}
    </p>
    {hasFilters && (
      <button
        onClick={onClearFilters}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        Clear all filters
      </button>
    )}
  </div>
);

const OrderCard = ({ order, isUpdating, isExpanded, onToggleExpand, onUpdateStatus }) => {
  const profile = getProfileFromOrder(order);
  const status = ORDER_STATUSES.includes(order.status) ? order.status : "pending";
  const statusStyle = STATUS_STYLES[status] || "bg-gray-100 text-gray-700 border border-gray-200";
  const orderItems = Array.isArray(order.items) ? order.items : [];

  return (
    <div
      id={`order-${order.id}`}
      className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 ${
        isUpdating ? 'opacity-50 border-gray-200' : 'border-gray-200 hover:shadow-md'
      } ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="p-6 cursor-pointer" onClick={onToggleExpand}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-xl ${statusStyle.split(' ')[0]}`}>
              <Package className={`h-6 w-6 ${statusStyle.split(' ')[1]}`} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order.order_number || order.id.slice(0, 8)}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
                  {status}
                </span>
              </div>

              {/* Contact Details */}
              <div className="mt-3 space-y-2">
                {profile ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profile.email && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Email:</span> {profile.email}
                      </p>
                    )}
                    {profile.phone && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Phone:</span> {profile.phone}
                      </p>
                    )}
                    {!profile.email && !profile.phone && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 col-span-2">
                        <p className="text-xs text-amber-700 flex items-center gap-2">
                          <AlertCircle className="h-3 w-3" />
                          Profile exists but contact details are missing
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <p className="text-xs text-amber-700 flex items-center gap-2">
                      <AlertCircle className="h-3 w-3" />
                      No profile found - User may not have completed registration
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                <Calendar className="h-3 w-3 inline mr-1" />
                {formatDate(order.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {orderItems.length > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
                  )}
                </p>
                <p className="text-xs text-gray-500">{orderItems.length} items</p>
              </div>
            )}
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'transform rotate-180' : ''
            }`} />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-2xl">
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Order Items
            </h4>
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Hash className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(item.price)} × {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(calculateItemTotal(item))}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Update Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUSES.map((newStatus) => {
                const style = STATUS_STYLES[newStatus] || "bg-gray-100 text-gray-700 border border-gray-200";
                return (
                  <button
                    key={newStatus}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateStatus(order.id, newStatus);
                    }}
                    disabled={isUpdating || order.status === newStatus}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${style} hover:scale-105 hover:shadow-sm ${
                      isUpdating || order.status === newStatus ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
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
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      logMissingProfiles(ordersWithProfiles);
      dispatch({ type: "SET_ORDERS", payload: ordersWithProfiles });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      dispatch({ type: "SET_ERROR", payload: message });
      console.error("Error fetching orders:", err);
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
      toast.success(`Order ${orderLabel} updated to ${newStatus}`);
      
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
            dispatch({
              type: "ADD_NOTIFICATION",
              payload: {
                id: generateId(),
                type: "success",
                message: `New order #${payload.new.order_number || payload.new.id} received`,
                orderId: payload.new.id,
                timestamp: new Date().toISOString(),
                read: false,
              },
            });
            
            toast.success("New order received!");
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
              dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                  id: generateId(),
                  type: "info",
                  message: `Order #${payload.new.order_number || payload.new.id} updated to ${payload.new.status}`,
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
          
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: generateId(),
              type: "warning",
              message: `Order #${payload.old.order_number || payload.old.id} was deleted`,
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
  const orderStats = useMemo(() => {
    const stats = {
      total: state.orders.length,
      pending: 0,
      approved: 0,
      revenue: 0,
      averageOrderValue: 0,
    };

    state.orders.forEach((order) => {
      if (order.status === "pending") stats.pending++;
      if (order.status === "approved") {
        stats.approved++;
        if (Array.isArray(order.items)) {
          stats.revenue += order.items.reduce(
            (sum, item) => sum + calculateItemTotal(item),
            0
          );
        }
      }
    });

    stats.averageOrderValue = stats.total > 0 ? stats.revenue / stats.total : 0;

    return stats;
  }, [state.orders]);

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...state.orders];

    // Apply status filter
    if (state.filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === state.filters.status);
    }

    // Apply search filter
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter((order) => {
        const profile = getProfileFromOrder(order);
        const orderNumber = (order.order_number || "").toLowerCase();
        const email = (profile?.email || "").toLowerCase();
        const phone = (profile?.phone || "").toLowerCase();
        
        return (
          orderNumber.includes(searchLower) ||
          email.includes(searchLower) ||
          phone.includes(searchLower)
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
      };
      
      filtered = filtered.filter((order) => {
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
          return (b.total_amount || 0) - (a.total_amount || 0);
        case "lowest":
          return (a.total_amount || 0) - (b.total_amount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.orders, state.filters]);

  const unreadNotificationsCount = useMemo(() => {
    return state.notifications.filter((n) => !n.read).length;
  }, [state.notifications]);

  // Handlers
  const handleManualRefresh = () => {
    fetchOrders(false);
    toast.success("Orders refreshed");
  };

  const handleClearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
    toast.success("Notifications cleared");
  };

  // Render loading skeleton
  if (state.loading && !state.orders.length) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header
          onBack={() => navigate(-1)}
          lastUpdate={state.lastUpdate}
          onRefresh={handleManualRefresh}
          refreshing={state.loading}
          notifications={state.notifications}
          unreadCount={unreadNotificationsCount}
          showNotifications={showNotifications}
          onToggleNotifications={() => {
            setShowNotifications(!showNotifications);
            if (!showNotifications) {
              dispatch({ type: "MARK_NOTIFICATIONS_READ" });
            }
          }}
          onClearNotifications={handleClearNotifications}
          notificationRef={notificationRef}
        />

        {/* Error Banner */}
        {state.error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Error Loading Orders</h3>
              <p className="text-sm text-red-600 mt-1">{state.error}</p>
            </div>
            <button
              onClick={handleManualRefresh}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <StatsGrid stats={orderStats} />

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
              hasFilters={state.filters.status !== "all" || !!state.filters.search}
              onClearFilters={() => dispatch({ type: "SET_FILTERS", payload: { status: "all", search: "" } })}
            />
          ) : (
            filteredAndSortedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isUpdating={state.updatingOrderId === order.id}
                isExpanded={selectedOrder === order.id}
                onToggleExpand={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                onUpdateStatus={updateOrderStatus}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
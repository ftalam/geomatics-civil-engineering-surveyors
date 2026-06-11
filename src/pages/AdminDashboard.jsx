import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const ORDER_STATUSES = ["pending", "approved"];

const getProfileFromOrder = (order) => {
  if (Array.isArray(order?.profiles)) return order.profiles[0] || null;
  return order?.profiles || null;
};

const attachProfilesToOrders = async (orderData) => {
  
  const safeOrders = Array.isArray(orderData) ? orderData : [];
  const userIds = Array.from(
    new Set(safeOrders.map((order) => order?.user_id).filter(Boolean)),
  );

  if (!userIds.length) return safeOrders;

  const { data: profilesData, error } = await supabase
    .from("profiles")
    .select("id, email, phone");


  if (error) {
    console.warn("Failed to load order profiles:", error);
    return safeOrders;
  }

  const profilesById = new Map(
    (Array.isArray(profilesData) ? profilesData : []).map((profile) => [
      profile.id,
      profile,
    ]),
  );

  return safeOrders.map((order) => ({
    ...order,
    profiles: profilesById.get(order.user_id) || getProfileFromOrder(order),
  }));
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  /*
  =============================
  FETCH ORDERS
  =============================
  */

  const fetchOrders = useCallback(async () => {
    setLoading(true);

    setErrorMessage("");

    const { data: orderData, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setOrders([]);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    const ordersWithProfiles = await attachProfilesToOrders(orderData);

    setOrders(ordersWithProfiles);
    setLoading(false);
  }, []);

  /*
  =============================
  LIVE ORDER COUNTERS
  =============================
  */

  const orderStats = useMemo(() => {
    const stats = {
      total: orders.length,
      pending: 0,
      approved: 0,
      revenue: 0
    };

    orders.forEach((order) => {
      if (order.status === "pending") stats.pending++;
      if (order.status === "approved") stats.approved++;

      if (order.status === "approved" && Array.isArray(order.items)) {
        order.items.forEach((item) => {
          stats.revenue += (item.price || 0) * (item.quantity || 1);
        });
      }
    });

    return stats;
  }, [orders]);

  /*
  =============================
  ORDERS (1 UI card per row)
  =============================
  */

  const groupedOrders = useMemo(() => {
    return orders.map((order) => {
      const orderItems = Array.isArray(order.items) ? order.items : [];
      const profile = getProfileFromOrder(order);

      return {
        id: `order_${order.id}`,
        orderId: order.id,
        userId: order.user_id,
        userEmail: profile?.email || "No profile email found",
        userPhone: profile?.phone || "No profile phone found",
        createdAt: order.created_at,
        status: order.status,
        items: orderItems.map((item) => ({
          ...item,
          orderId: order.id,
          orderNumber: order.order_number,
          status: order.status
        })),
        orderIds: [order.id],
        orderNumbers: order.order_number ? [order.order_number] : []
      };
    });
  }, [orders]);

  /*
  =============================
  STATUS BADGES
  =============================
  */

  const getStatusBadge = (status) => {
    const normalizedStatus = ORDER_STATUSES.includes(status) ? status : "pending";
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium ${
          styles[normalizedStatus] || "bg-gray-100 text-gray-700"
        }`}
      >
        {normalizedStatus}
      </span>
    );
  };

  /*
  =============================
  UPDATE ORDER STATUS
  =============================
  */

  const normalizeOrderId = (value) => {
    if (!value) return null;
    if (typeof value === "string" && value.startsWith("order_")) {
      return value.slice("order_".length);
    }
    return value;
  };

  const updateOrderStatus = async (orderId, status) => {
    const normalizedOrderId = normalizeOrderId(orderId);

    if (!normalizedOrderId) {
      toast.error("Invalid order id.");
      return;
    }

    if (!ORDER_STATUSES.includes(status)) {
      toast.error("Invalid status.");
      return;
    }

    setUpdatingOrderId(normalizedOrderId);

    const { data, error } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", normalizedOrderId)
      .select("id, order_number, status")
      .maybeSingle();

    setUpdatingOrderId(null);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!data) {
      const { data: existingOrder, error: existingOrderError } = await supabase
        .from("orders")
        .select("id")
        .eq("id", normalizedOrderId)
        .maybeSingle();

      if (existingOrderError) {
        toast.error(
          `Order update failed and existence check failed: ${existingOrderError.message}`,
        );
      } else if (existingOrder) {
        toast.error(
          "You can see this order but cannot update it. Check the orders UPDATE RLS policy for admins.",
        );
      } else {
        toast.error("Order not found (it may have been deleted).");
      }

      fetchOrders();
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === normalizedOrderId ? { ...order, ...data } : order
      )
    );

    const label = data?.order_number
      ? `#${data.order_number}`
      : String(normalizedOrderId);
    toast.success(`Order ${label} updated to ${status}`);
    fetchOrders();
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  /*
  =============================
  REALTIME SUBSCRIPTIONS
  =============================
  */

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        async (payload) => {
          console.log('New order received:', payload.new);
          toast.success("New order received");
          const [newOrder] = await attachProfilesToOrders([payload.new]);

          if (newOrder) {
            setOrders((prev) => [newOrder, ...prev]);
            setNotifications((prev) => [
              {
                message: "New order received",
                created_at: new Date()
              },
              ...prev
            ]);
            setLastUpdate(new Date());
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        async (payload) => {
          console.log('Order updated:', payload.new);
          const [updatedOrder] = await attachProfilesToOrders([payload.new]);
          setOrders((prev) =>
            prev.map((order) =>
              order.id === payload.new.id
                ? { ...order, ...(updatedOrder || payload.new) }
                : order
            )
          );
          setLastUpdate(new Date());
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => {
          console.log('Order deleted:', payload.old);
          setOrders((prev) => prev.filter((order) => order.id !== payload.old.id));
          setLastUpdate(new Date());
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel("admin-profiles")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          fetchOrders(); // Refetch to update profile info
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(profilesChannel);
    };
  }, []);

  /*
  =============================
  UI
  =============================
  */

  return (
    <div className="p-10">

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-3xl font-bold">Admin Orders</h1>
            <p className="text-sm text-gray-500">Last updated: {lastUpdate.toLocaleString()}</p>
          </div>
        </div>

        <div className="relative">
          <button
            className="border rounded px-3 py-2 text-sm"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            Notifications {notifications.length ? `(${notifications.length})` : ""}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-lg border bg-white shadow-lg z-10">
              <div className="p-3 border-b flex items-center justify-between">
                <p className="font-semibold text-sm">Notifications</p>
                <button
                  className="text-xs text-gray-600 hover:text-black"
                  onClick={() => setNotifications([])}
                >
                  Clear
                </button>
              </div>
              <div className="max-h-64 overflow-auto">
                {!notifications.length && (
                  <p className="p-3 text-sm text-gray-500">No notifications.</p>
                )}
                {notifications.map((note, index) => (
                  <div key={index} className="p-3 border-b last:border-b-0">
                    <p className="text-sm">{note.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ORDER STATS */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="p-4 bg-gray-100 rounded">
          <p className="text-black">Total Orders</p>
          <p className="text-xl text-primary font-bold">{orderStats.total}</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded">
          <p className="text-black">Pending</p>
          <p className="text-xl text-primary font-bold">{orderStats.pending}</p>
        </div>

        <div className="p-4 bg-green-100 rounded">
          <p  className="text-black">Approved</p>
          <p className="text-xl text-orange font-bold">{orderStats.approved}</p>
        </div>

        <div className="p-4 bg-orange-500 rounded">
          <p className="text-black">Revenue</p>
          <p className="text-xl font-bold">${orderStats.revenue}</p>
        </div>

      </div>

      {/* ORDERS */}

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {!loading && errorMessage && (
        <p className="text-red-600">Failed to load orders: {errorMessage}</p>
      )}

      {groupedOrders.map((group) => (

        <div key={group.id} className="border p-4 mb-4 rounded-lg">
          <p className="text-lg font-semibold">
            {group.orderNumbers?.length
              ? `Order #${group.orderNumbers.join(", ")}`
              : `Order IDs: ${group.orderIds.join(", ")}`}
          </p>
          <p className="font-semibold">
            {group.userEmail} - {group.userPhone}
          </p>
          <p className="text-xs text-gray-500">
            User ID: {group.userId}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(group.createdAt).toLocaleString()}
          </p>

          <div className="space-y-2 mt-3">

            {group.items.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded"
              >

                <div>
                  <p className="font-medium text-black">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>

                  {/* Timeline */}
                  <p className="text-xs text-gray-400">
                    Created {new Date(group.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-black">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(group.status)}

                    <select
                      value={
                        ORDER_STATUSES.includes(group.status)
                          ? group.status
                          : "pending"
                      }
                      disabled={updatingOrderId === group.orderId}
                      onChange={(e) =>
                        handleStatusChange(group.orderId, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-sm text-gray-700">
                    {typeof item.price === "number"
                      ? `$${(item.price * (item.quantity || 1)).toFixed(2)}`
                      : ""}
                  </div>
                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
};

export default AdminDashboard;

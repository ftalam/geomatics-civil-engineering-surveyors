import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const ORDER_STATUSES = ["pending", "approved", "rejected"];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingRejectOrderId, setPendingRejectOrderId] = useState(null);
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

    const safeOrders = Array.isArray(orderData) ? orderData : [];
    const userIds = Array.from(
      new Set(safeOrders.map((order) => order.user_id).filter(Boolean)),
    );

    let profileById = {};

    if (userIds.length) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds);

      if (!profileError && Array.isArray(profileData)) {
        profileById = Object.fromEntries(
          profileData.map((profile) => [
            profile.id,
            { email: profile.email },
          ]),
        );
      }
    }

    setOrders(
      safeOrders.map((order) => ({
        ...order,
        profiles: profileById[order.user_id] ?? order.profiles,
      })),
    );
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
      rejected: 0,
      revenue: 0
    };

    orders.forEach((order) => {
      if (order.status === "pending") stats.pending++;
      if (order.status === "approved") stats.approved++;
      if (order.status === "rejected") stats.rejected++;

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
  SMART ORDER GROUPING
  (Checkout session grouping)
  =============================
  */

  const groupedOrders = useMemo(() => {
    const groups = {};

    orders.forEach((order) => {

      const sessionKey =
        order.checkout_session_id || `${order.user_id}_${order.created_at}`;

      if (!groups[sessionKey]) {
        groups[sessionKey] = {
          id: sessionKey,
          userId: order.user_id,
          userEmail: order.profiles?.email || order.user_id,
          createdAt: order.created_at,
          items: [],
          orderIds: [],
          orderNumbers: []
        };
      }

      const orderItems = Array.isArray(order.items) ? order.items : [];

      groups[sessionKey].items.push(
        ...orderItems.map((item) => ({
          ...item,
          orderId: order.id,
          orderNumber: order.order_number,
          status: order.status
        }))
      );

      groups[sessionKey].orderIds.push(order.id);
      if (order.order_number) {
        groups[sessionKey].orderNumbers.push(order.order_number);
      }
    });

    return Object.values(groups);
  }, [orders]);

  /*
  =============================
  STATUS BADGES
  =============================
  */

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700"
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  /*
  =============================
  UPDATE ORDER STATUS
  =============================
  */

  const updateOrderStatus = async (orderId, status, rejectReason = "") => {
    setUpdatingOrderId(orderId);

    const { data, error } = await supabase
      .from("orders")
      .update({
        status,
        ...(status === "rejected" && rejectReason && { rejection_reason: rejectReason })
      })
      .eq("id", orderId)
      .select("id, order_number, status, rejection_reason")
      .single();

    setUpdatingOrderId(null);

    if (error) {
      toast.error(error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, ...data } : order
      )
    );

    const label = data?.order_number ? `#${data.order_number}` : String(orderId);
    toast.success(`Order ${label} updated to ${status}`);
    fetchOrders();
  };

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === "rejected") {
      setPendingRejectOrderId(orderId);
      setRejectReason("");
      setShowRejectDialog(true);
    } else {
      updateOrderStatus(orderId, newStatus);
    }
  };

  const confirmReject = () => {
    updateOrderStatus(pendingRejectOrderId, "rejected", rejectReason);
    setShowRejectDialog(false);
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
          // Fetch the order with profile info
          const { data: newOrder } = await supabase
            .from("orders")
            .select(`
              *,
              profiles:user_id (
                email
              )
            `)
            .eq("id", payload.new.id)
            .single();

          if (newOrder) {
            setOrders((prev) => [newOrder, ...prev]);
            setNotifications((prev) => [
              {
                message: "🛒 New order received",
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
        (payload) => {
          console.log('Order updated:', payload.new);
          setOrders((prev) =>
            prev.map((order) =>
              order.id === payload.new.id ? { ...order, ...payload.new } : order
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

      <div className="grid grid-cols-5 gap-4 mb-6">

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

        <div className="p-4 bg-red-100 rounded">
          <p className="text-black">Rejected</p>
          <p className="text-xl text-red font-bold">{orderStats.rejected}</p>
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
            {group.userEmail} • {new Date(group.createdAt).toLocaleString()}
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

                <div className="flex items-center gap-2 text-black">

                  {getStatusBadge(item.status)}

                  <select
                    value={item.status}
                    disabled={updatingOrderId === item.orderId}
                    onChange={(e) =>
                      handleStatusChange(item.orderId, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

      {/* REJECT DIALOG */}

      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h3 className="font-semibold mb-3">Reject Order</h3>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason..."
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowRejectDialog(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmReject}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

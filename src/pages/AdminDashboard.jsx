import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ORDER_STATUSES = ["pending", "approved", "rejected"];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data || []);
    }

    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    setUpdatingOrderId(orderId);

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    setUpdatingOrderId(null);

    if (error) {
      alert(error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("admin-orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchOrders();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {loading && <p className="text-muted-foreground mb-4">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-muted-foreground">No orders yet.</p>
      )}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded-xl">
          <p className="text-sm text-muted-foreground">Order: {order.id}</p>
          <p>User: {order.user_id}</p>

          <div className="flex items-center gap-2 mt-2">
            <p>Status:</p>
            <select
              value={order.status}
              disabled={updatingOrderId === order.id}
              onChange={(event) => updateOrderStatus(order.id, event.target.value)}
              className="border rounded-lg px-2 py-1"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            {(Array.isArray(order.items) ? order.items : []).map((item, index) => (
              <p key={`${order.id}_${index}`}>
                - {item.name} x {item.quantity || 1}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

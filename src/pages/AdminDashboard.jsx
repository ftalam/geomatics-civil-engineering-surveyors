import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const ORDER_STATUSES = ["pending", "approved", "rejected"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingRejectOrderId, setPendingRejectOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles:user_id (
          email
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data || []);
    }

    setLoading(false);
  };

  // Group orders by user and creation time (within 5 minutes)
  const groupedOrders = useMemo(() => {
    const groups = {};
    
    orders.forEach((order) => {
      // Round created_at to nearest 5 minutes to group similar timestamps
      const createdAt = new Date(order.created_at);
      const roundedTime = new Date(Math.floor(createdAt.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000));
      const key = `${order.user_id}_${roundedTime.getTime()}`;
      
      if (!groups[key]) {
        groups[key] = {
          id: key,
          userId: order.user_id,
          userEmail: order.profiles?.email || order.user_id,
          createdAt: order.created_at,
          items: [],
          orderIds: []
        };
      }
      
      // Add all items from this order
      const orderItems = Array.isArray(order.items) ? order.items : [];
      groups[key].items.push(...orderItems.map(item => ({
        ...item,
        orderId: order.id,
        status: order.status
      })));
      groups[key].orderIds.push(order.id);
    });
    
    // Convert to array and assign sequential order numbers
    return Object.values(groups).map((group, index) => ({
      ...group,
      orderNumber: index + 1
    }));
  }, [orders]);

  const updateOrderStatus = async (orderId, status, rejectReason = "") => {
    setUpdatingOrderId(orderId);

    const { error } = await supabase
      .from("orders")
      .update({ 
        status,
        ...(status === "rejected" && rejectReason && { rejection_reason: rejectReason })
      })
      .eq("id", orderId);

    setUpdatingOrderId(null);

    if (error) {
      alert(error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );

    // Handle status change notifications
    if (status === "approved") {
      alert(`Order approved! User will be prompted to make payment within their account.`);
    } else if (status === "rejected") {
      alert(`Order rejected. User has been notified: ${rejectReason || "Order was rejected by admin."}`);
    }
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
    if (pendingRejectOrderId) {
      updateOrderStatus(pendingRejectOrderId, "rejected", rejectReason);
      setShowRejectDialog(false);
      setPendingRejectOrderId(null);
      setRejectReason("");
    }
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
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-6 border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Admin Orders</h1>
      </div>

      {loading && <p className="text-muted-foreground mb-4">Loading orders...</p>}

      {!loading && groupedOrders.length === 0 && (
        <p className="text-muted-foreground">No orders yet.</p>
      )}

      {groupedOrders.map((group) => (
        <div key={group.id} className="border p-2 mb-2 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-lg font-semibold">Order #{group.orderNumber}</p>
              <p className="text-sm text-muted-foreground">User: {group.userEmail} on {new Date(group.createdAt).toLocaleString()} </p>
              <p className="text-xs text-muted-foreground">
               
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Items:</h4>
            <div className="space-y-2">
              {group.items.map((item, index) => (
                <div key={`${group.id}_${index}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity || 1} • Category: {item.category || 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm font-medium">Status:</span>
                    <select
                      value={item.status}
                      disabled={updatingOrderId === item.orderId}
                      onChange={(event) => handleStatusChange(item.orderId, event.target.value)}
                      className="border rounded-lg px-2 py-1 text-black text-sm"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status} className="text-black">
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Rejection Reason Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Reject Order</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this order. This will be shown to the customer.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 border rounded-lg mb-4 min-h-24"
              required
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setPendingRejectOrderId(null);
                  setRejectReason("");
                }}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

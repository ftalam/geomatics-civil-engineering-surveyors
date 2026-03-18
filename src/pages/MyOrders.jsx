import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useOrderHistory } from "@/hooks/useOrderHistory";

const formatDateTime = (value) => {
  if (!value) return "\u2014";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "\u2014";
  return date.toLocaleString();
};

const computeOrderTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1),
    0,
  );
};

const statusStyles = {
  pending: "border-yellow-200 bg-yellow-100 text-yellow-900",
  approved: "border-green-200 bg-green-100 text-green-900",
  rejected: "border-red-200 bg-red-100 text-red-900",
};

export default function MyOrders() {
  const { user } = useAuth();
  const { orders, loading, error, refresh } = useOrderHistory(user?.id);

  const sortedOrders = useMemo(() => orders, [orders]);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <section className="border-b border-gray-200 bg-gradient-to-b from-white to-slate-50 py-6">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/geoshop" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Shop
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-sm text-gray-600">
                Track your order status and view previous orders.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refresh()}
            disabled={loading}
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <p className="text-sm text-gray-600">Loading orders...</p>
          )}

          {!loading && !sortedOrders.length && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-sm text-gray-600 mb-4">
                When you submit an order, it will show up here.
              </p>
              <Button asChild>
                <Link to="/geoshop">Browse products</Link>
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {sortedOrders.map((order) => {
              const total = computeOrderTotal(order.items);
              const normalizedStatus =
                order.status === "approved"
                  ? "approved"
                  : order.status === "rejected"
                    ? "rejected"
                    : "pending";
              const badgeClass =
                statusStyles[normalizedStatus] ||
                "bg-slate-100 text-slate-800 border-slate-200";

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {order.order_number ? "Order #" : "Order ID"}
                      </p>
                      <p className="text-lg font-bold">
                        {order.order_number ? `#${order.order_number}` : order.id}
                      </p>
                      {order.order_number && (
                        <p className="text-xs text-gray-600">
                          Ref: {order.id}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Created {formatDateTime(order.created_at)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={`px-3 py-1 ${badgeClass}`}>
                        {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-lg font-bold">
                          KES {total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold mb-2">Items</p>
                    <div className="space-y-2">
                      {(Array.isArray(order.items) ? order.items : []).map(
                        (item, index) => (
                          <div
                            key={`${order.id}_${item?.product_id ?? index}`}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="min-w-0">
                              <p className="font-medium truncate">
                                {item?.name || "Item"}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item?.quantity || 1}
                              </p>
                            </div>
                            <p className="font-semibold">
                              KES{" "}
                              {(
                                (item?.price || 0) * (item?.quantity || 1)
                              ).toFixed(2)}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useOrderHistory } from "@/hooks/useOrderHistory";

const formatDateTime = (value) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
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
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function MyOrders() {
  const { user } = useAuth();
  const { orders, loading, error, refresh } = useOrderHistory(user?.id);

  const sortedOrders = useMemo(() => orders, [orders]);

  return (
    <div className="products-theme">
      <section className="py-6 bg-gradient-card">
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
              <p className="text-sm text-muted-foreground">
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
            <div className="mb-4 rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {loading && (
            <p className="text-sm text-muted-foreground">Loading orders...</p>
          )}

          {!loading && !sortedOrders.length && (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-sm text-muted-foreground mb-4">
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
              const badgeClass =
                statusStyles[order.status] ||
                "bg-slate-100 text-slate-800 border-slate-200";

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border bg-card p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {order.order_number ? "Order #" : "Order ID"}
                      </p>
                      <p className="text-lg font-bold">
                        {order.order_number ? `#${order.order_number}` : order.id}
                      </p>
                      {order.order_number && (
                        <p className="text-xs text-muted-foreground">
                          Ref: {order.id}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Created {formatDateTime(order.created_at)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
                      >
                        {order.status || "unknown"}
                      </span>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-lg font-bold">
                          KES {total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
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
                              <p className="text-xs text-muted-foreground">
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

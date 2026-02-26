import { Button } from "@/components/ui/button";

export default function CartDrawer({
  open,
  onClose,
  cart,
  itemCount,
  isSubmitting,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-card h-full p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Cart ({itemCount})</h2>
          <button onClick={onClose} className="text-sm text-muted-foreground">
            Close x
          </button>
        </div>

        {cart.length === 0 && <p className="text-muted-foreground">Cart is empty.</p>}

        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.product_id} className="border rounded-xl p-3">
              <div className="flex gap-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-14 h-14 bg-muted rounded-lg" />
                )}

                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="border rounded px-2"
                      onClick={() => onDecrease(item.product_id)}
                    >
                      -
                    </button>
                    <span className="min-w-5 text-center">{item.quantity}</span>
                    <button
                      className="border rounded px-2"
                      onClick={() => onIncrease(item.product_id)}
                    >
                      +
                    </button>

                    <button
                      className="text-red-500 text-sm ml-auto"
                      onClick={() => onRemove(item.product_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <Button className="w-full mt-6" onClick={onCheckout} disabled={isSubmitting}>
            {isSubmitting ? "Sending order..." : "Send Order"}
          </Button>
        )}
      </div>
    </div>
  );
}

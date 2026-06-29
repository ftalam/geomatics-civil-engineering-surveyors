import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const computeOrderTotal = (order) => {
  const items = Array.isArray(order?.items) ? order.items : [];
  return items.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1),
    0,
  );
};

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
  orderHistory,
  orderHistoryLoading,
  orderHistoryError,
  onRefreshOrderHistory,
  trackingOrderId,
  setTrackingOrderId,
  trackingResult,
  onTrackOrder,
}) {
  if (!open) return null;

  // Form state for special requests
  const [specialMessage, setSpecialMessage] = useState("");
  const [estimateDemo, setEstimateDemo] = useState("");
  const [buyRent, setBuyRent] = useState("");
  const [aob, setAob] = useState("");

  const subtotal = (Array.isArray(cart) ? cart : []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const recentOrders = Array.isArray(orderHistory) ? orderHistory.slice(0, 6) : [];

  // Validate required fields
  const isFormValid =
    specialMessage.trim() !== "" &&
    estimateDemo.trim() !== "" &&
    buyRent.trim() !== "" &&
    aob.trim() !== "";

  // Handle checkout with form data
  const handleCheckoutWithForm = () => {
    if (!isFormValid) {
      alert("Please fill in all required fields: Message, Estimate/Demo, Interest, and AOB");
      return;
    }

    // Create order data with special requests
    const specialRequests = {
      specialMessage,
      estimateDemo,
      buyRent,
      aob,
    };

    // Call the parent onCheckout with the form data
    // You may need to modify onCheckout in the parent to accept this parameter
    onCheckout(specialRequests);
  };

  // Add to your component state
const [cancellingOrder, setCancellingOrder] = useState(null);

// Add the cancel order handler
const handleCancelOrder = async (orderId) => {
  // Ask for confirmation
  if (!window.confirm("Are you sure you want to cancel this order?")) {
    return;
  }

  setCancellingOrder(orderId);
  
  try {
    // Call your API to cancel the order
    const response = await fetch(`/api/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any auth headers if needed
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel order');
    }

    // Refresh the order history to show updated status
    if (onRefreshOrderHistory) {
      await onRefreshOrderHistory();
    }
    
    // Optional: Show success message
    // You can add a toast notification here if you have one
    
  } catch (error) {
    console.error('Error cancelling order:', error);
    // Optional: Show error message
    alert('Failed to cancel order. Please try again.');
  } finally {
    setCancellingOrder(null);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl p-4 md:p-6 shadow-2xl relative">
        <div className="mb-8">
          <Link
            to="/geoshop"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#99ED47] mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-semibold">Continue Shopping</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900">Shopping Cart</h1>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">{itemCount}</span> items in your cart
              </p>
            </div>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Close
            </button>
          </div>
        </div>

        <div data-cart-page-target="cartContent">
          <div className="space-y-4 mb-6">
            {(Array.isArray(cart) ? cart : []).map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-2xl p-4 border-2 border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.variant || item.category || "Item"}</p>
                    <p className="text-lg font-bold text-[#F23045] mt-2">
                      KES {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.product_id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
                    <button
                      onClick={() => onDecrease(item.product_id)}
                      className="text-gray-600 hover:text-[#99ED47] font-bold text-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => onIncrease(item.product_id)}
                      className="text-gray-600 hover:text-[#99ED47] font-bold text-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    KES {(item.price || 0) * (item.quantity || 1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#99ED47]/30 shadow-[0_8px_24px_rgba(153,237,71,0.2)]">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
               
                <span>Delivery</span>
                <span className="font-semibold text-green-600 text-xs">Will be communicated</span>
              </div>
             
            </div>

            {/* Special Requests Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-blue-200/50 mb-6">
              {/* Message textarea */}
              <div className="mb-5">
                <label htmlFor="specialMessage" className="block font-semibold text-gray-700 mb-2">
                  💬 Your Message
                </label>
                <textarea
                  id="specialMessage"
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value)}
                  placeholder="e.g. I'd like an estimate on this equipment or a rental fee quote…"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#99ED47] focus:outline-none focus:ring-2 focus:ring-[#99ED47]/30 bg-white text-gray-900 font-medium resize-none"
                  rows="4"
                />
                <p className="text-xs text-gray-600 mt-1">Let us know if this is an estimate, a demo request or any specific requirement.</p>
              </div>

              {/* Option dropdowns grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {/* Estimate/Demo dropdown */}
                <div>
                  <label htmlFor="estimateDemoSelect" className="block font-semibold text-gray-600 mb-2">
                    📋 Estimate or Demo
                  </label>
                  <select
                    id="estimateDemoSelect"
                    value={estimateDemo}
                    onChange={(e) => setEstimateDemo(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#99ED47] focus:outline-none focus:ring-2 focus:ring-[#99ED47]/30 bg-white text-gray-900 font-medium cursor-pointer"
                  >
                    <option value="" disabled hidden className = "text-gray-900"> – select – </option>
                    <option value="estimate">📊 Estimate </option>
                    <option value="demonstration">🎥 Demonstration</option>
                    <option value="estimate+demo">📋 Quotation + demo</option>
                  </select>
                </div>

                {/* Buy/Rent dropdown */}
                <div>
                  <label htmlFor="buyRentSelect" className="block font-semibold text-gray-600 mb-2">
                    🤝 Interested In
                  </label>
                  <select
                    id="buyRentSelect"
                    value={buyRent}
                    onChange={(e) => setBuyRent(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#99ED47] focus:outline-none focus:ring-2 focus:ring-[#99ED47]/30 bg-white text-gray-900 font-medium cursor-pointer"
                  >
                    <option value="" disabled hidden > – select – </option>
                    <option value="buy">💳 Buying</option>
                    <option value="rent">📆 Renting</option>
                    <option value="buy-rent">🔄 Either (buy/rent)</option>
                  </select>
                </div>
              </div>

              {/* AOB input */}
              <div className="mb-4">
                <label htmlFor="aobInput" className="block font-semibold text-gray-700 mb-2">
                  Any Other Business
                </label>
                <input
                  type="text"
                  id="aobInput"
                  value={aob}
                  onChange={(e) => setAob(e.target.value)}
                  placeholder="e.g. special delivery, additional warranty, contact preference …"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#99ED47] focus:outline-none focus:ring-2 focus:ring-[#99ED47]/30 bg-white text-gray-900 font-medium"
                />
                <p className="text-xs text-gray-600 mt-1">Anything else we should know</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span>✓</span>
                <span>Your preferences help us tailor the response</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWithForm}
              disabled={isSubmitting || !isFormValid}
              className="w-full bg-[#99ED47] hover:bg-[#8ddc3a] text-gray-900 font-bold py-4 rounded-full shadow-[0_4px_16px_rgba(153,237,71,0.4)] hover:shadow-[0_8px_24px_rgba(153,237,71,0.5)] hover:scale-105 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending order..." : "Send Order →"}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              Your order is submitted to our admin for confirmation and processing.
            </p>
            <p className="text-center text-xs text-gray-500 mt-2">
              🔒 Secure order • Delivery across Nairobi available
            </p>
          </div>

          <div className="mt-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  My Orders
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <div className="flex items-start justify-between gap-3">
                  <DialogHeader>
                    <DialogTitle>My Orders</DialogTitle>
                  </DialogHeader>

                  {onRefreshOrderHistory && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRefreshOrderHistory()}
                      disabled={orderHistoryLoading}
                    >
                      Refresh
                    </Button>
                  )}
                </div>

                {orderHistoryError && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {orderHistoryError}
                  </div>
                )}

                {orderHistoryLoading && (
                  <p className="text-sm text-muted-foreground">Loading orders...</p>
                )}

                {!orderHistoryLoading && !recentOrders.length && (
                  <p className="text-sm text-muted-foreground">No orders yet.</p>
                )}

                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border bg-white p-3 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
    
                        <p className="font-semibold truncate text-gray-600">
                          Order {order.order_number ? `#${order.order_number}` : order.id}
                        </p>
                        {order.order_number && (
                          <p className="text-xs text-muted-foreground">
                            Ref: {order.id}
                          </p>
                        )}
                       
                        <p className="text-xs text-muted-foreground">
                          {order.created_at ? new Date(order.created_at).toLocaleString() : "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm font-semibold text-gray-600">
                          {order.status === "approved" ? "approved" : "pending"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          KES {computeOrderTotal(order).toFixed(2)}
                        </p>

                         {/* Cancel Button - Only show for pending orders */}
                          {order.status !== "approved" && order.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              disabled={cancellingOrder === order.id}
                              className="mt-2 text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
                            >
                              {cancellingOrder === order.id ? "Cancelling..." : "Cancel Order"}
                            </button>
                          )}
                          
                          {/* Show cancelled status */}
                          {order.status === "cancelled" && (
                            <p className="mt-2 text-xs text-red-500 font-medium">Cancelled</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <DialogClose asChild>
                    <Link
                      to="/geoshop/orders"
                      onClick={onClose}
                      className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
                    >
                      View all
                    </Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                      Close
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200 mt-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-700">Track Order</p>
                <p className="text-slate-500">Enter order # or reference ID and click track.</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={trackingOrderId}
                onChange={(e) => setTrackingOrderId(e.target.value)}
                placeholder="Order # or ID"
                className="border rounded-md px-2 py-1 text-xs w-full"
              />
              <button
                onClick={onTrackOrder}
                className="bg-primary text-white rounded-md px-2 py-1 text-xs font-semibold"
              >
                Track
              </button>
            </div>
            {trackingResult && <p className="text-xs text-slate-600 mt-2">{trackingResult}</p>}
          </div>

          {Array.isArray(cart) && cart.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-gray-200 mt-4">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add equipment to get started!</p>
              <Link
                to="/geoshop"
                onClick={onClose}
                className="inline-block bg-[#f97316] hover:bg-[#db5621ec] text-gray-900 font-bold px-8 py-3 rounded-full transition-all"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function ProfileSheet({
  open,
  onOpenChange,
  user,
  orders,
  ordersLoading,
  ordersError,
  onRefreshOrders,
}) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileRole, setProfileRole] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!open || !user?.id) return;

      setProfileLoading(true);
      setProfileError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("phone, role")
        .eq("id", user.id)
        .maybeSingle();

      setProfileLoading(false);

      if (error) {
        setProfileError(error.message || "Failed to load profile.");
        return;
      }

      setProfileRole(data?.role || "");
      setProfilePhone(data?.phone || "");
    };

    loadProfile();
  }, [open, user?.id]);

  const orderSummary = useMemo(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];
    const totalOrders = safeOrders.length;
    const approved = safeOrders.filter((order) => order.status === "approved").length;
    const pending = safeOrders.filter((order) => order.status === "pending").length;
    const itemsByKey = new Map();

    safeOrders
      .filter((order) => order?.status === "approved")
      .forEach((order) => {
        const items = Array.isArray(order?.items) ? order.items : [];
        items.forEach((item) => {
          const key = item?.product_id || item?.name;
          if (!key) return;

          const previous = itemsByKey.get(key) || { name: item?.name || String(key), quantity: 0 };
          const quantity = Number(item?.quantity) || 0;
          itemsByKey.set(key, { ...previous, quantity: previous.quantity + quantity });
        });
      });

    const itemsObtained = Array.from(itemsByKey.values())
      .filter((entry) => entry.quantity > 0)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 12);

    return { totalOrders, approved, pending, itemsObtained };
  }, [orders]);

  const handleSave = async () => {
    if (!user?.id) return;

    setSaving(true);
    setProfileError("");

    const payload = {
      id: user.id,
      phone: profilePhone?.trim() || null,
      email: user.email || null,
    };

    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });

    setSaving(false);

    if (error) {
      setProfileError(error.message || "Failed to save profile.");
      return;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="h-full w-[360px] max-w-[90vw] overflow-y-auto border-r border-gray-200 bg-white p-6 text-gray-900"
      >
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription className="text-gray-600">
            Manage your settings and review your order summary.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Overview</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Email</span>
                <span className="truncate font-medium">{user?.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Phone</span>
                <span className="truncate font-medium">{profilePhone || "—"}</span>
              </div>
              {profileRole ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Role</span>
                  <span className="truncate font-medium">{profileRole}</span>
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Settings</h3>
              <Button variant="outline" size="sm" onClick={handleSave} disabled={saving || profileLoading}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Phone number</label>
                <input
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="+254712345678"
                  type="tel"
                  value={profilePhone}
                  onChange={(event) => setProfilePhone(event.target.value)}
                  disabled={profileLoading}
                />
              </div>

              {profileLoading ? <p className="text-xs text-gray-500">Loading profile...</p> : null}
              {profileError ? <p className="text-xs text-red-600">{profileError}</p> : null}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Orders</h3>
              <Button variant="outline" size="sm" onClick={onRefreshOrders} disabled={ordersLoading}>
                {ordersLoading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>

            {ordersError ? <p className="mt-3 text-xs text-red-600">{ordersError}</p> : null}

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Total orders</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{orderSummary.totalOrders}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Approved</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{orderSummary.approved}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Pending</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{orderSummary.pending}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Link to="/geoshop/orders" className="text-sm font-medium text-cyan-700 hover:text-cyan-800">
                View full history
              </Link>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <h4 className="text-xs font-semibold text-gray-700">Items obtained</h4>
              <div className="mt-3 space-y-2">
                {orderSummary.itemsObtained.length ? (
                  orderSummary.itemsObtained.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                    >
                      <p className="min-w-0 truncate font-medium text-gray-900">{entry.name}</p>
                      <p className="ml-3 shrink-0 text-sm font-semibold text-gray-700">x{entry.quantity}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No approved items yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

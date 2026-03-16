import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const normalizeOrders = (data) => (Array.isArray(data) ? data : []);

export function useOrderHistory(userId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEnabled = useMemo(() => Boolean(userId), [userId]);

  const refresh = useCallback(async () => {
    if (!userId) return [];

    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("id, order_number, status, created_at, items")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (fetchError) {
      setOrders([]);
      setError(fetchError.message || "Failed to load orders.");
      setLoading(false);
      return [];
    }

    const nextOrders = normalizeOrders(data);
    setOrders(nextOrders);
    setLoading(false);
    return nextOrders;
  }, [userId]);

  useEffect(() => {
    if (!isEnabled) {
      setOrders([]);
      setError("");
      setLoading(false);
      return undefined;
    }

    refresh();

    const channel = supabase
      .channel(`user-orders-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setOrders((prev) => {
            const previous = normalizeOrders(prev);

            if (payload.eventType === "DELETE") {
              const deletedId = payload.old?.id;
              return deletedId
                ? previous.filter((order) => order.id !== deletedId)
                : previous;
            }

            const nextOrder = payload.new;
            if (!nextOrder?.id) return previous;

            const existingIndex = previous.findIndex(
              (order) => order.id === nextOrder.id,
            );

            if (existingIndex === -1) {
              return [nextOrder, ...previous];
            }

            const copy = previous.slice();
            copy[existingIndex] = { ...copy[existingIndex], ...nextOrder };
            return copy;
          });
        },
      )
      .subscribe();

    const pollInterval = setInterval(() => {
      refresh();
    }, 30000);

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, [isEnabled, refresh, userId]);

  return {
    orders,
    loading,
    error,
    refresh,
  };
}

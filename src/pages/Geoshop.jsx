import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Search, ShoppingCart, Star, Phone, Mail, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GeoshopLogo from "@/assets/3.svg";
import CartDrawer from "@/components/CartDrawer";
import ProfileSheet from "@/components/ProfileSheet";
import { useAuth } from "@/context/AuthContext";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { supabase } from "@/lib/supabaseClient";
import GeoLtd from "@/assets/1.svg";
import {
  addItemToCart,
  getCart,
  getCartCount,
  removeItemFromCart,
  saveCart,
  setItemQuantity,
} from "@/utils/cart";

const PRODUCT_IMAGES_BUCKET =
  import.meta.env.VITE_SUPABASE_PRODUCT_IMAGES_BUCKET || "product-images";
const CATALOGUE_URL =
  import.meta.env.VITE_GEOSHOP_CATALOGUE_URL ||"geoshop-catalog";
const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID || null;
const DETAILS_TAB_SPECIFICATIONS = "specifications";
const DETAILS_TAB_RESOURCES = "resources";

const parseJsonIfNeeded = (value) => {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }

  return value;
};

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const parsedValue = parseJsonIfNeeded(value);
    if (Array.isArray(parsedValue)) {
      return normalizeStringList(parsedValue);
    }

    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const toSpecItemText = (item) => {
  if (typeof item === "string") return item.trim();
  if (!item || typeof item !== "object") return "";

  const label = String(item.label ?? item.name ?? item.key ?? "").trim();
  const value = String(item.value ?? item.text ?? item.detail ?? "").trim();

  if (label && value) return `${label} : ${value}`;
  if (label) return label;
  if (value) return value;
  return "";
};

const normalizeSpecItems = (value) => {
  const parsed = parseJsonIfNeeded(value);

  if (Array.isArray(parsed)) {
    return parsed.map((item) => toSpecItemText(item)).filter(Boolean);
  }

  if (parsed && typeof parsed === "object") {
    return Object.entries(parsed)
      .map(([label, itemValue]) => `${label} : ${String(itemValue ?? "").trim()}`)
      .filter(Boolean);
  }

  return normalizeStringList(parsed);
};

const getProductSpecificationSections = (product) => {
  const raw =
    parseJsonIfNeeded(product?.specifications) ??
    parseJsonIfNeeded(product?.spec_sections) ??
    parseJsonIfNeeded(product?.specs);

  if (!raw) return [];

  if (Array.isArray(raw)) {
    const normalizedSections = raw
      .map((section, index) => {
        if (!section || typeof section !== "object" || Array.isArray(section)) {
          return null;
        }

        const title = String(
          section.title ?? section.heading ?? section.name ?? `Section ${index + 1}`,
        ).trim();
        const items = normalizeSpecItems(
          section.items ??
            section.attributes ??
            section.values ??
            section.points ??
            section.details,
        );

        if (!items.length) return null;
        return { title, items };
      })
      .filter(Boolean);

    if (normalizedSections.length) return normalizedSections;

    const fallbackItems = normalizeSpecItems(raw);
    if (!fallbackItems.length) return [];
    return [{ title: "Specifications", items: fallbackItems }];
  }

  if (raw && typeof raw === "object") {
    return Object.entries(raw)
      .map(([title, items]) => ({
        title,
        items: normalizeSpecItems(items),
      }))
      .filter((section) => section.items.length > 0);
  }

  const fallbackItems = normalizeSpecItems(raw);
  if (!fallbackItems.length) return [];
  return [{ title: "Specifications", items: fallbackItems }];
};

const getProductImages = (product) => {
  const rawImages = parseJsonIfNeeded(product?.images);
  const images = [];

  if (Array.isArray(rawImages)) {
    rawImages.forEach((item) => {
      if (typeof item === "string" && item.trim()) {
        images.push(item.trim());
      }
    });
  } else if (typeof rawImages === "string" && rawImages.trim()) {
    normalizeStringList(rawImages).forEach((item) => images.push(item));
  }

  if (typeof product?.image_url === "string" && product.image_url.trim()) {
    images.push(product.image_url.trim());
  }

  if (typeof product?.image === "string" && product.image.trim()) {
    images.push(product.image.trim());
  }

  const uniqueImages = Array.from(new Set(images));
  return uniqueImages.length ? uniqueImages : ["/placeholder.svg"];
};

const normalizeResource = (resource, fallbackLanguage = "en") => {
  const parsed = parseJsonIfNeeded(resource);

  if (!parsed) return null;

  if (typeof parsed === "string") {
    return {
      language: fallbackLanguage,
      name: parsed,
      size: "",
      url: "",
    };
  }

  if (typeof parsed !== "object" || Array.isArray(parsed)) return null;

  const language = String(
    parsed.language ?? parsed.lang ?? parsed.locale ?? fallbackLanguage,
  )
    .trim()
    .toLowerCase();
  const name = String(
    parsed.name ?? parsed.title ?? parsed.file ?? parsed.filename ?? parsed.label ?? "",
  ).trim();
  const size = String(parsed.size ?? parsed.file_size ?? "").trim();
  const url = String(
    parsed.url ?? parsed.href ?? parsed.link ?? parsed.path ?? parsed.download_url ?? "",
  ).trim();

  if (!name && !url) return null;

  return {
    language: language || "en",
    name: name || url.split("/").pop() || "Resource",
    size,
    url,
  };
};

const getProductResources = (product) => {
  const raw =
    parseJsonIfNeeded(product?.resources) ??
    parseJsonIfNeeded(product?.documents) ??
    parseJsonIfNeeded(product?.resource_files);

  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((item) => normalizeResource(item)).filter(Boolean);
  }

  if (raw && typeof raw === "object") {
    const directResource = normalizeResource(raw);
    if (directResource) return [directResource];

    return Object.entries(raw).flatMap(([language, value]) => {
      const parsedValue = parseJsonIfNeeded(value);

      if (Array.isArray(parsedValue)) {
        return parsedValue
          .map((item) =>
            normalizeResource(
              typeof item === "object" && item !== null
                ? { ...item, language: item.language ?? language }
                : item,
              language,
            ),
          )
          .filter(Boolean);
      }

      const resource = normalizeResource(parsedValue, language);
      return resource ? [resource] : [];
    });
  }

  return [];
};

const getLanguageLabel = (language) => {
  const normalized = String(language ?? "").trim();
  if (!normalized) return "Unknown";
  if (normalized.length <= 3) return normalized.toUpperCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const toDownloadUrl = (url, fileName = "") => {
  const rawUrl = String(url ?? "").trim();
  if (!rawUrl) return "";

  if (/([?&])download(=|&|$)/i.test(rawUrl)) return rawUrl;

  const [base, hash] = rawUrl.split("#");
  const separator = base.includes("?") ? "&" : "?";
  const downloadValue = String(fileName ?? "").trim();
  const downloadQuery = downloadValue
    ? `download=${encodeURIComponent(downloadValue)}`
    : "download";

  return `${base}${separator}${downloadQuery}${hash ? `#${hash}` : ""}`;
};

const getProductImage = (product) => {
  return getProductImages(product)[0];
};

const normalizeOrderRequests = (specialRequests = {}) => {
  const cleanValue = (value) => String(value ?? "").trim();

  return {
    specialMessage: cleanValue(specialRequests.specialMessage),
    estimateDemo: cleanValue(specialRequests.estimateDemo),
    buyRent: cleanValue(specialRequests.buyRent),
    aob: cleanValue(specialRequests.aob),
  };
};

const hasOrderRequests = (requests) =>
  Object.values(requests || {}).some((value) => String(value ?? "").trim());

const getProductFetchErrorMessage = (error) => {
  if (!error) return "Unable to load products.";

  if (error.code === "42501") {
    return "Products are blocked by Row Level Security. Add a SELECT policy for this role in Supabase.";
  }

  if (error.code === "42P01") {
    return "The public.products table was not found in the current Supabase project.";
  }

  return error.message || "Unable to load products.";
};

const AdminUploadPanel = ({ userId, productColumns, onUpload }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    rating: "",
    reviews: "",
    specificationsJson: "",
    resourcesJson: "",
    extraImageUrls: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toNumberOrNull = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const parseJsonInput = (value, fieldLabel) => {
    const trimmed = value.trim();
    if (!trimmed) return { value: null, error: null };

    try {
      return { value: JSON.parse(trimmed), error: null };
    } catch {
      return {
        value: null,
        error: `${fieldLabel} must be valid JSON.`,
      };
    }
  };

  const parseAdditionalImageUrls = (value) => {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const buildInsertPayload = (
    imageUrl,
    specifications,
    resources,
    additionalImageUrls,
  ) => {
    const allImages = [imageUrl, ...additionalImageUrls].filter(Boolean);

    const base = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: toNumberOrNull(form.price),
      rating: toNumberOrNull(form.rating),
      reviews: toNumberOrNull(form.reviews),
      images: allImages.length ? allImages : [imageUrl],
      image_url: imageUrl,
      image: imageUrl,
      specifications,
      spec_sections: specifications,
      specs: specifications,
      resources,
      documents: resources,
    };

    if (!productColumns.length) {
      const payload = {
        name: base.name,
        category: base.category,
        description: base.description,
        price: base.price,
        rating: base.rating,
        reviews: base.reviews,
        images: base.images,
      };

      if (specifications !== null) payload.specifications = specifications;
      if (resources !== null) payload.resources = resources;
      return payload;
    }

    const payload = {};

    productColumns.forEach((column) => {
      if (column in base) {
        payload[column] = base[column];
      }
    });

    if (!Object.prototype.hasOwnProperty.call(payload, "name")) {
      payload.name = base.name;
    }
    if (!Object.prototype.hasOwnProperty.call(payload, "category")) {
      payload.category = base.category;
    }
    if (!Object.prototype.hasOwnProperty.call(payload, "description")) {
      payload.description = base.description;
    }

    const hasImageColumn =
      Object.prototype.hasOwnProperty.call(payload, "images") ||
      Object.prototype.hasOwnProperty.call(payload, "image_url") ||
      Object.prototype.hasOwnProperty.call(payload, "image");

    if (!hasImageColumn) {
      payload.images = [imageUrl];
    }

    return payload;
  };

  const submitProduct = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      setMessage("Select an image before uploading.");
      return;
    }

    if (!form.name.trim() || !form.category.trim()) {
      setMessage("Name and category are required.");
      return;
    }

    const specificationsResult = parseJsonInput(
      form.specificationsJson,
      "Specifications JSON",
    );
    if (specificationsResult.error) {
      setMessage(specificationsResult.error);
      return;
    }

    const resourcesResult = parseJsonInput(form.resourcesJson, "Resources JSON");
    if (resourcesResult.error) {
      setMessage(resourcesResult.error);
      return;
    }

    const additionalImageUrls = parseAdditionalImageUrls(form.extraImageUrls);

    setUploading(true);
    setMessage("");

    const safeName = imageFile.name.replace(/\s+/g, "-").toLowerCase();
    const filePath = `${userId}/${Date.now()}-${safeName}`;

    const { error: storageError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(filePath, imageFile, { upsert: false });

    if (storageError) {
      setUploading(false);
      setMessage(`Image upload failed: ${storageError.message}`);
      return;
    }

    const { data: publicData } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(filePath);

    const imageUrl = publicData?.publicUrl;
    const payload = buildInsertPayload(
      imageUrl,
      specificationsResult.value,
      resourcesResult.value,
      additionalImageUrls,
    );

    if (payload.price === null) delete payload.price;
    if (payload.rating === null) delete payload.rating;
    if (payload.reviews === null) delete payload.reviews;

    let insertResult = await supabase.from("products").insert([payload]);

    // Fallback for schemas that use image_url instead of images.
    if (insertResult.error && !productColumns.length) {
      const fallbackPayload = {
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        image_url: imageUrl,
      };
      insertResult = await supabase.from("products").insert([fallbackPayload]);
    }

    setUploading(false);

    if (insertResult.error) {
      setMessage(`Product insert failed: ${insertResult.error.message}`);
      return;
    }

    setMessage("Product uploaded successfully.");
    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      rating: "",
      reviews: "",
      specificationsJson: "",
      resourcesJson: "",
      extraImageUrls: "",
    });
    setImageFile(null);
    onUpload();
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="bg-card border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Admin Product Upload</h2>
          <form onSubmit={submitProduct} className="grid md:grid-cols-2 gap-3">
            <input
              value={form.name}
              onChange={(event) => handleInput("name", event.target.value)}
              className="border rounded-lg p-3 text-black"
              placeholder="Product name"
              required
            />
            <input
              value={form.category}
              onChange={(event) => handleInput("category", event.target.value)}
              className="border rounded-lg p-3 text-black"
              placeholder="Category"
              required
            />
            <input
              value={form.rating}
              onChange={(event) => handleInput("rating", event.target.value)}
              className="border rounded-lg p-3 text-black"
              placeholder="Rating"
            />
            <input
              value={form.reviews}
              onChange={(event) => handleInput("reviews", event.target.value)}
              className="border rounded-lg p-3 text-black"
              placeholder="Reviews"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="border rounded-lg p-3 text-black"
              required
            />
            <textarea
              value={form.description}
              onChange={(event) => handleInput("description", event.target.value)}
              className="border rounded-lg p-3 md:col-span-2 min-h-24 text-black"
              placeholder="Product description"
            />
            <textarea
              value={form.specificationsJson}
              onChange={(event) =>
                handleInput("specificationsJson", event.target.value)
              }
              className="border rounded-lg p-3 md:col-span-2 min-h-24 text-black"
              placeholder='Specifications JSON (e.g. [{"title":"Measurements","items":["Angular accuracy : 2\""]}])'
            />
            <textarea
              value={form.resourcesJson}
              onChange={(event) => handleInput("resourcesJson", event.target.value)}
              className="border rounded-lg p-3 md:col-span-2 min-h-24 text-black"
              placeholder='Resources JSON (e.g. [{"language":"en","name":"Datasheet.pdf","size":"4.1 MB","url":"https://..."}])'
            />
            <textarea
              value={form.extraImageUrls}
              onChange={(event) => handleInput("extraImageUrls", event.target.value)}
              className="border rounded-lg p-3 md:col-span-2 min-h-20 text-black"
              placeholder="Additional image URLs (comma-separated or one per line)"
            />
            <p className="text-xs text-muted-foreground md:col-span-2">
              If your `products` table has `specifications` and `resources` columns
              (JSONB), these values are stored and shown in View Details.
            </p>
            <Button
              type="submit"
              className="md:col-span-2"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Product"}
            </Button>
          </form>
          {message && <p className="text-sm text-muted-foreground mt-3">{message}</p>}
        </div>
      </div>
    </section>
  );
};

const Geoshop = () => {
  const navigate = useNavigate();
  const { user, role, signOut, loading: authLoading } = useAuth();

  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsTab, setDetailsTab] = useState(DETAILS_TAB_SPECIFICATIONS);
  const [resourceLanguage, setResourceLanguage] = useState("all");
  const [activeDetailImageIndex, setActiveDetailImageIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [orderNotice, setOrderNotice] = useState("");
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [trackingOrderId, setTrackingOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState("");

  const {
    orders: orderHistory,
    loading: orderHistoryLoading,
    error: orderHistoryError,
    refresh: refreshOrderHistory,
  } = useOrderHistory(user?.id);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setProductsError("");

    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
      setProductsError(getProductFetchErrorMessage(error));
      setLoadingProducts(false);
      return;
    }

    setProducts(Array.isArray(data) ? data : []);
    setLoadingProducts(false);
  }, []);

  const fetchPendingOrdersCount = useCallback(async () => {
    if (role !== "admin") return;

    const { count, error } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (!error) {
      setPendingOrdersCount(count || 0);
    }
  }, [role]);

  useEffect(() => {
    if (authLoading) return;
    fetchProducts();
  }, [authLoading, user?.id, fetchProducts]);

  useEffect(() => {
    if (authLoading || role !== "admin") return;
    fetchPendingOrdersCount();

    const ordersChannel = supabase
      .channel("geoshop-orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchPendingOrdersCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
    };
  }, [authLoading, role, fetchPendingOrdersCount]);

  useEffect(() => {
    const channel = supabase
      .channel("geoshop-products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  useEffect(() => {
    if (!user?.id) {
      setCart([]);
      return;
    }

    setCart(getCart(user.id));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    saveCart(user.id, cart);
  }, [user?.id, cart]);

  useEffect(() => {
    if (!user?.id) return undefined;

    const fetchLatestOrderStatus = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data?.length && data[0].status !== "pending") {
        const label = data[0].order_number ? `#${data[0].order_number}` : data[0].id;
        setOrderNotice(`Order ${label} status: ${data[0].status}.`);
      }
    };

    fetchLatestOrderStatus();

    const channel = supabase
      .channel(`user-order-status-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const nextStatus = payload.new?.status;
          const previousStatus = payload.old?.status;

          if (nextStatus && nextStatus !== previousStatus) {
            const label = payload.new?.order_number ? `#${payload.new.order_number}` : payload.new.id;
            setOrderNotice(`Order ${label} status: ${nextStatus}.`);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  useEffect(() => {
    if (!orderNotice) return undefined;

    const timer = setTimeout(() => {
      setOrderNotice("");
    }, 8000);

    return () => clearTimeout(timer);
  }, [orderNotice]);

  const categories = useMemo(() => {
    const values = products
      .map((product) => product.category)
      .filter(Boolean);
    return ["All", ...Array.from(new Set(values))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = (product.name || "")
        .toLowerCase()
        .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const productColumns = useMemo(() => {
    if (!products.length) return [];
    return Object.keys(products[0]);
  }, [products]);

  const selectedProductImages = useMemo(
    () => getProductImages(selectedProduct),
    [selectedProduct],
  );

  const selectedProductSpecifications = useMemo(
    () => getProductSpecificationSections(selectedProduct),
    [selectedProduct],
  );

  const selectedProductResources = useMemo(
    () => getProductResources(selectedProduct),
    [selectedProduct],
  );

  const resourceLanguages = useMemo(() => {
    return Array.from(
      new Set(
        selectedProductResources.map((resource) =>
          String(resource.language || "en").toLowerCase(),
        ),
      ),
    );
  }, [selectedProductResources]);

  const visibleResources = useMemo(() => {
    if (resourceLanguage === "all") return selectedProductResources;

    return selectedProductResources.filter(
      (resource) => String(resource.language || "en").toLowerCase() === resourceLanguage,
    );
  }, [resourceLanguage, selectedProductResources]);

  const cartCount = getCartCount(cart);

  const requireLogin = () => {
    navigate("/geoshop/login", { state: { from: "/geoshop" } });
  };

  const handleAddToCart = (product) => {
    if (!user?.id) {
      requireLogin();
      return;
    }

    setCart((prev) => addItemToCart(prev, product));
    toast.success(`${product.name} Added to cart!`, {
      duration: 2000,
    });
  };

  const changeQuantity = (productId, delta) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => String(item.product_id) === String(productId),
      );
      const nextQuantity = (existing?.quantity || 0) + delta;
      return setItemQuantity(prev, productId, nextQuantity);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => removeItemFromCart(prev, productId));
  };

  const handleCheckout = async (specialRequests = {}) => {
    if (!user?.id) {
      requireLogin();
      return;
    }

    if (!cart.length) return;

    setSendingOrder(true);

    try {
      const profilePayload = { id: user.id };
      const email = user.email || user.user_metadata?.email;
      const phone = user.phone || user.user_metadata?.phone;

      if (email) profilePayload.email = email;
      if (phone) profilePayload.phone = phone;

      // Ensure user profile exists
      await supabase
        .from("profiles")
        .upsert(profilePayload, { onConflict: "id" });

      // Create order
      const orderItems = cart.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      }));

      const orderRequests = normalizeOrderRequests(specialRequests);
      const orderPayload = {
        user_id: user.id,
        items: orderItems,
        status: "pending",
      };

      if (hasOrderRequests(orderRequests)) {
        orderPayload.special_requests = orderRequests;
      }

      const { data: inserted, error } = await supabase
        .from("orders")
        .insert([orderPayload])
        .select("id, order_number");

      if (error) {
        throw error;
      }

      setCart([]);
      saveCart(user.id, []);
      setCartOpen(false);
      setOrderNotice("Order submitted. Waiting for admin approval.");
      if (inserted?.[0]?.id) {
        const label = inserted[0].order_number ? `#${inserted[0].order_number}` : inserted[0].id;
        setTrackingResult(`Order ${label} created and pending.`);
      }
      await refreshOrderHistory();
    } catch (error) {
      alert(error.message);
    } finally {
      setSendingOrder(false);
    }
  };

  const openCart = () => {
    if (!user?.id) {
      requireLogin();
      return;
    }
    setCartOpen(true);
  };

  const handleTrackOrder = async () => {
    const rawOrderId = trackingOrderId.trim();

    if (!rawOrderId) {
      setTrackingResult("Please enter order ID to track.");
      return;
    }

    const isNumericId = /^\d+$/.test(rawOrderId);
    const numericValue = isNumericId ? Number(rawOrderId) : null;

    const baseSelect = "id, order_number, status, created_at, items";

    let result = null;

    if (isNumericId) {
      result = await supabase
        .from("orders")
        .select(baseSelect)
        .eq("order_number", numericValue);

      if (!result.error && !result.data?.length) {
        result = await supabase
          .from("orders")
          .select(baseSelect)
          .eq("id", numericValue);
      }
    } else {
      result = await supabase
        .from("orders")
        .select(baseSelect)
        .eq("id", rawOrderId);
    }

    const { data, error } = result;

    if (error) {
      setTrackingResult("Could not track order. Please try again.");
      return;
    }

    if (!data?.length) {
      setTrackingResult("No order found for that ID.");
      return;
    }

    const order = data[0];
    const orderLabel = order.order_number ? `#${order.order_number}` : order.id;
    setTrackingResult(
      `Order ${orderLabel}: ${order.status} (created ${new Date(order.created_at).toLocaleString()})`,
    );
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setDetailsTab(DETAILS_TAB_SPECIFICATIONS);
    setActiveDetailImageIndex(0);

    const defaultLanguage =
      getProductResources(product)?.[0]?.language?.toLowerCase() || "all";
    setResourceLanguage(defaultLanguage);
  };

  return (
    <div className="products-theme">
      <div id="flash-container" className="fixed top-20 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none">
        {orderNotice && (
          <div className="flash-notification bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg shadow-md animate-slide-in">
            {orderNotice}
          </div>
        )}
      </div>

      <section className="py-6 bg-gradient-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div>
            <div className="flex gap-6">
              <Link to="/geoshop/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>   
             </div>
             <div className="mt-4 mb-4 flex flex-col gap-2 items-start">
                <img
              src={GeoshopLogo}
              alt="Geomatics Civil Engineering Surveyors logo"
              className="h-10 w-auto object-contain"
               /> 
             <p className="text-muted-foreground">
              Premium surveying instruments and accessories provider.
            </p>
            </div>
              <Link
                to="/"
                className="bg-muted border px-5 py-1 rounded-2xl hover:bg-muted/80 transition-colors"
              >
               A GCES Ltd Company
              </Link>
            <div className="flex gap-3 mt-4">
              {CATALOGUE_URL && CATALOGUE_URL !== "geoshop-catalog" ? (
                <>
                  <a
                    href={CATALOGUE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl hover:bg-primary/90 transition-colors"
                  >
                    View Catalogue
                  </a>

                  <a
                    href={toDownloadUrl(CATALOGUE_URL, "Geoshop Products Catalog.pdf")}
                    target="_blank"
                    rel="noreferrer"
                    download="Geoshop Products Catalog.pdf"
                    className="bg-primary text-primary-foreground px-5 py-2 rounded-2xl hover:bg-primary/90 transition-colors"
                  >
                    Download Catalogue
                  </a>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Catalogue not available - please contact admin to upload catalogue file
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 items-end">
            {!user && (
              <Button variant="hero" size="lg" asChild>
                <Link to="/geoshop/login" className="flex gap-2">
                  <LogIn className="w-5 h-5" />
                  Login to Shop
                </Link>
              </Button>
            )}

            {user && (
              <div className="text-sm text-muted-foreground text-right">
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  className="inline-flex items-center justify-end gap-2 font-medium text-cyan-700 hover:text-cyan-800 hover:underline"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[260px] truncate">{user.email}</span>
                </button>
                <div className="flex justify-end gap-2 mt-2">
                  {role === "admin" && (
                    <Button variant="outline" size="sm" asChild className="relative">
                      <Link to="/geoshop/admin">
                        Admin Dashboard
                        {pendingOrdersCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {pendingOrdersCount > 9 ? '9+' : pendingOrdersCount}
                          </span>
                        )}
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await signOut();
                      navigate("/geoshop");
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </div>
            )}

            <Button variant="outline" onClick={openCart}>
              <ShoppingCart className="w-4 h-4" />
              Cart ({cartCount})
            </Button>
          </div>
        </div>
      </section>

      {orderNotice && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="border border-green-300 bg-green-50 rounded-xl p-3 text-sm">
              {orderNotice}
            </div>
          </div>
        </section>
      )}

      {role === "admin" && user?.id && (
        <AdminUploadPanel
          userId={user.id}
          productColumns={productColumns}
          onUpload={fetchProducts}
        />
      )}

      <section className="py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loadingProducts && (
            <p className="text-muted-foreground">Loading products...</p>
          )}

          {productsError && (
            <div className="mb-4 rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              <p>{productsError}</p>
              {SUPABASE_PROJECT_ID && (
                <p className="mt-1 text-xs text-destructive/90">
                  Active Supabase project: {SUPABASE_PROJECT_ID}
                </p>
              )}
            </div>
          )}

          {!loadingProducts && !productsError && filteredProducts.length === 0 && (
            <p className="text-muted-foreground">No products found.</p>
          )}

          {/* more columns so each card is narrower */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id || `${product.name}_${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-primary">{product.category}</p>
                  <h3 className="font-bold text-lg">{product.name}</h3>

                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {Number(product.rating) || 0} ({Number(product.reviews) || 0})
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="hero"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openProductDetails(product)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-10 p-4">
          <div className="bg-card max-w-6xl w-full p-4 rounded-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start gap-4 mb-1">
              <div>
                <p className="text-muted-foreground mt-1">{selectedProduct.name}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                Close
              </Button>
            </div>

            <div className="border-b mb-1">
              <div className="flex gap-8 text-lg">
                <button
                  type="button"
                  onClick={() => setDetailsTab(DETAILS_TAB_SPECIFICATIONS)}
                  className={`pb-2 border-b-2 transition-colors ${
                    detailsTab === DETAILS_TAB_SPECIFICATIONS
                      ? "border-primary text-primary"
                      : "border-transparent text-foreground/80"
                  }`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setDetailsTab(DETAILS_TAB_RESOURCES)}
                  className={`pb-2 border-b-2 transition-colors ${
                    detailsTab === DETAILS_TAB_RESOURCES
                      ? "border-primary text-primary"
                      : "border-transparent text-foreground/80"
                  }`}
                >
                  Resources
                </button>
              </div>
            </div>

            {detailsTab === DETAILS_TAB_SPECIFICATIONS ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/*LEFT SIDE*/}
                <aside className="space-y-6">
                  <div className="space-y-10">
                    {selectedProductSpecifications.length > 0 ? (
                      selectedProductSpecifications.map((section, sectionIndex) => (
                        <div
                          key={`${section.title}_${sectionIndex}`}
                          className="border-b pb-3 last:border-b-0"
                        >
                          <h4 className="text-xl font-semibold tracking-tight mb-2">
                            {section.title}
                          </h4>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={`${section.title}_${itemIndex}`}
                                className="flex items-start gap-3"
                              >
                                <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No detailed specifications available for this product yet.
                      </p>
                    )}
                  </div>
                </aside>

                {/*RIGHT SIDE*/}
                <div className="relative w-full lg:max-w-xl">
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 backdrop-blur shadow-card">
                    <figure className="rounded-xl overflow-hidden bg-card/30">
                      <img
                        src={
                          selectedProductImages[activeDetailImageIndex] ||
                          selectedProductImages[0]
                        }
                        alt={selectedProduct.name}
                        className="w-full aspect-square object-contain p-4 transition-transform duration-500 ease-out hover:scale-105"
                      />
                    </figure>

                    {selectedProductImages.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {selectedProductImages.map((image, index) => (
                          <button
                            key={`${selectedProduct.id || selectedProduct.name}_${index}`}
                            type="button"
                            onClick={() => setActiveDetailImageIndex(index)}
                            className={`border rounded-lg overflow-hidden ${
                              index === activeDetailImageIndex
                                ? "ring-2 ring-primary border-primary"
                                : "border-border"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${selectedProduct.name} view ${index + 1}`}
                              className="w-full h-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 text-center">
                      <h3 className="text-3xl font-bold tracking-tight">{selectedProduct.name}</h3>
                      <p className="text-muted-foreground mt-3">
                        {selectedProduct.description || "No description provided."}
                      </p>
                    </div>
                    <div className="flex justify-center mt-6">
                      <Button variant="outline" asChild>
                        <a
                          href={`mailto:sales@geomatics.co.ke?subject=Quotation Request - ${selectedProduct.name}&body=Hello Geomatics Team,%0D%0A%0D%0AI would like to request a quotation for:%0D%0A%0D%0AProduct: ${selectedProduct.name}%0D%0A%0D%0APlease provide pricing, availability, and delivery timelines.%0D%0A%0D%0AThank you.`}
                        >
                          Request Quote
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <p className="text-muted-foreground text-sm">
                    Download brochures, datasheets and manuals for this product.
                  </p>

                  {resourceLanguages.length > 1 && (
                    <label className="flex items-center gap-2 text-sm">
                      <span>Language</span>
                      <select
                        value={resourceLanguage}
                        onChange={(event) => setResourceLanguage(event.target.value)}
                        className="border rounded-lg px-3 py-2 bg-card"
                      >
                        <option value="all">All</option>
                        {resourceLanguages.map((language) => (
                          <option key={language} value={language}>
                            {getLanguageLabel(language)}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  {visibleResources.length > 0 ? (
                    visibleResources.map((resource, index) => (
                      <div
                        key={`${resource.name}_${index}`}
                        className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >
                        <div>
                          <p className="font-semibold">{resource.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {resource.size || "File size not provided"}
                            {resource.language
                              ? `  |  ${getLanguageLabel(resource.language)}`
                              : ""}
                          </p>
                        </div>

                        {resource.url ? (
                          <div className="flex flex-wrap gap-2">
                            <a
                              className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                              href={resource.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View
                            </a>
                            <a
                              className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                              href={toDownloadUrl(resource.url, resource.name)}
                              target="_blank"
                              rel="noreferrer"
                              download={resource.name || true}
                            >
                              Download
                            </a>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No download URL in database.
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      No resources available for this product yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ProfileSheet
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={user}
        orders={orderHistory}
        ordersLoading={orderHistoryLoading}
        ordersError={orderHistoryError}
        onRefreshOrders={refreshOrderHistory}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        itemCount={cartCount}
        isSubmitting={sendingOrder}
        onIncrease={(productId) => changeQuantity(productId, 1)}
        onDecrease={(productId) => changeQuantity(productId, -1)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        orderHistory={orderHistory}
        orderHistoryLoading={orderHistoryLoading}
        orderHistoryError={orderHistoryError}
        onRefreshOrderHistory={refreshOrderHistory}
        trackingOrderId={trackingOrderId}
        setTrackingOrderId={setTrackingOrderId}
        trackingResult={trackingResult}
        onTrackOrder={handleTrackOrder}
      />

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img
                src={GeoLtd}
                alt="Geoshop limited"
                className="h-20 w-auto "
              /> 
              </div>
            <div>
              <div className="space-y-3 mt-3">
                 <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">1st Floor, Phileo Arcade <br/> Thika Rd. Ruiru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">+254 768922891</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">sales@geomatics.co.ke</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl text-primary mb-4"> <b>GET IN TOUCH</b> <br/> WITH US </h3>
              <div className=" grid grid-cols-3 gap-2">
                <Link to="/geoshop/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/services/equipment-supply-training" className="block text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </div>
            </div>
          </div>
        </div>
         <div>
             <p className="text-sm text-center text-muted-foreground"> © {new Date().getFullYear()} Geoshop. All rights reserved. </p>
         </div>
      </footer>
    </div>
  );
};

export default Geoshop;

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Search, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
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
const CATALOGUE_PATH = "/catalogue/Geoshop%20Products-Catalog.pdf";
const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID || null;

const getProductImage = (product) => {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images[0];
  }

  return product?.image_url || product?.image || "/placeholder.svg";
};

const getProductPriceLabel = (product) => {
  const price = Number(product?.price);
  if (!Number.isFinite(price) || price <= 0) return null;
  return `KES ${price.toLocaleString()}`;
};

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
    rating: "4.5",
    reviews: "0",
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

  const buildInsertPayload = (imageUrl) => {
    const base = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: toNumberOrNull(form.price),
      rating: toNumberOrNull(form.rating),
      reviews: toNumberOrNull(form.reviews),
      images: [imageUrl],
      image_url: imageUrl,
      image: imageUrl,
    };

    if (!productColumns.length) {
      return {
        name: base.name,
        category: base.category,
        description: base.description,
        price: base.price,
        rating: base.rating,
        reviews: base.reviews,
        images: base.images,
      };
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
    const payload = buildInsertPayload(imageUrl);

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
      rating: "4.5",
      reviews: "0",
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
              className="border rounded-lg p-3"
              placeholder="Product name"
              required
            />
            <input
              value={form.category}
              onChange={(event) => handleInput("category", event.target.value)}
              className="border rounded-lg p-3"
              placeholder="Category"
              required
            />
            <input
              value={form.price}
              onChange={(event) => handleInput("price", event.target.value)}
              className="border rounded-lg p-3"
              placeholder="Price"
            />
            <input
              value={form.rating}
              onChange={(event) => handleInput("rating", event.target.value)}
              className="border rounded-lg p-3"
              placeholder="Rating"
            />
            <input
              value={form.reviews}
              onChange={(event) => handleInput("reviews", event.target.value)}
              className="border rounded-lg p-3"
              placeholder="Reviews"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="border rounded-lg p-3"
              required
            />
            <textarea
              value={form.description}
              onChange={(event) => handleInput("description", event.target.value)}
              className="border rounded-lg p-3 md:col-span-2 min-h-24"
              placeholder="Product description"
            />
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
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [orderNotice, setOrderNotice] = useState("");

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

  useEffect(() => {
    if (authLoading) return;
    fetchProducts();
  }, [authLoading, user?.id, fetchProducts]);

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
        .select("id, status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data?.length && data[0].status !== "pending") {
        setOrderNotice(`Order ${data[0].id} status: ${data[0].status}.`);
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
            setOrderNotice(`Order ${payload.new.id} status: ${nextStatus}.`);
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

  const cartCount = getCartCount(cart);

  const requireLogin = () => {
    navigate("/login", { state: { from: "/geoshop" } });
  };

  const handleAddToCart = (product) => {
    if (!user?.id) {
      requireLogin();
      return;
    }

    setCart((prev) => addItemToCart(prev, product));
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

  const handleCheckout = async () => {
    if (!user?.id) {
      requireLogin();
      return;
    }

    if (!cart.length) return;

    setSendingOrder(true);

    const orderItems = cart.map((item) => ({
      product_id: item.product_id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        items: orderItems,
        status: "pending",
      },
    ]);

    setSendingOrder(false);

    if (error) {
      alert(error.message);
      return;
    }

    setCart([]);
    saveCart(user.id, []);
    setCartOpen(false);
    setOrderNotice("Order submitted. Waiting for admin approval.");
  };

  const openCart = () => {
    if (!user?.id) {
      requireLogin();
      return;
    }
    setCartOpen(true);
  };

  return (
    <div className="products-theme">
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-3">GEOSHOP</h1>
            <p className="text-sm text-cyan-600 font-italic">A GCES Ltd. Company</p>
            <p className="text-muted-foreground">
              Premium surveying instruments and accessories provider.
            </p>

            <div className="flex gap-3 mt-4">
              <a
                href={CATALOGUE_PATH}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl"
              >
                View Catalogue
              </a>

              <a
                href={CATALOGUE_PATH}
                download
                className="bg-primary text-primary-foreground px-5 py-2 rounded-2xl"
              >
                Download Catalogue
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-end">
            {!user && (
              <Button variant="hero" size="lg" asChild>
                <Link to="/login" className="flex gap-2">
                  <LogIn className="w-5 h-5" />
                  Login to Shop
                </Link>
              </Button>
            )}

            {user && (
              <div className="text-sm text-muted-foreground text-right">
                <p>{user.email}</p>
                <div className="flex justify-end gap-2 mt-2">
                  {role === "admin" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin">Admin Dashboard</Link>
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

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="p-5">
                  <p className="text-xs text-primary">{product.category}</p>
                  <h3 className="font-bold text-lg">{product.name}</h3>

                  <div className="flex items-center gap-2 text-sm mb-3">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {Number(product.rating) || 0} ({Number(product.reviews) || 0})
                  </div>

                  {getProductPriceLabel(product) && (
                    <p className="font-semibold mb-4">{getProductPriceLabel(product)}</p>
                  )}

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
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-card max-w-3xl w-full p-6 rounded-2xl">
            <div className="flex justify-end">
              <button onClick={() => setSelectedProduct(null)}>Close x</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="text-muted-foreground mb-4">
                  {selectedProduct.description || "No description provided."}
                </p>

                <div className="flex gap-3">
                  <Button onClick={() => handleAddToCart(selectedProduct)}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
      />
    </div>
  );
};

export default Geoshop;

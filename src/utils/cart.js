const getCartKey = (userId) => `cart_${userId}`;

const getProductId = (product) =>
  String(product?.product_id ?? product?.id ?? product?.sku ?? product?.name);

const getProductImage = (product) => {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images[0];
  }

  return product?.image ?? product?.image_url ?? null;
};

const normalizeCartItem = (item) => ({
  ...item,
  product_id: String(item?.product_id ?? item?.id ?? item?.name),
  quantity: Math.max(1, Number(item?.quantity) || 1),
});

export const getCart = (userId) => {
  if (!userId) return [];

  try {
    const rawValue = localStorage.getItem(getCartKey(userId));
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];

    return parsed.map(normalizeCartItem);
  } catch {
    return [];
  }
};

export const saveCart = (userId, cart) => {
  if (!userId) return;
  localStorage.setItem(getCartKey(userId), JSON.stringify(cart));
};

export const clearCart = (userId) => {
  if (!userId) return;
  localStorage.removeItem(getCartKey(userId));
};

export const addItemToCart = (cart, product) => {
  const productId = getProductId(product);
  const existing = cart.find((item) => String(item.product_id) === productId);

  if (existing) {
    return cart.map((item) =>
      String(item.product_id) === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [
    ...cart,
    {
      product_id: productId,
      name: product?.name ?? "Unnamed product",
      category: product?.category ?? "Uncategorized",
      image: getProductImage(product),
      price: Number(product?.price) || null,
      quantity: 1,
    },
  ];
};

export const setItemQuantity = (cart, productId, quantity) =>
  cart
    .map((item) =>
      String(item.product_id) === String(productId)
        ? { ...item, quantity: Math.max(0, Number(quantity) || 0) }
        : item,
    )
    .filter((item) => item.quantity > 0);

export const removeItemFromCart = (cart, productId) =>
  cart.filter((item) => String(item.product_id) !== String(productId));

export const getCartCount = (cart) =>
  cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);

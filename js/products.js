/* IndoKidz — product catalogue engine
   Prices in INR. Extracted from source asset naming convention.
   Supports dynamic localStorage persistence for Admin CRUD operations. */

const PRODUCTS_KEY = "indokidz_products_v2";

const DEFAULT_PRODUCTS = [
  {
    id: "ik-001",
    name: "Bike ST-011",
    category: "motorcycles",
    price: 11000,
    image: "assets/products/ik-001.jpeg",
    colors: ["White", "Red", "Blue", "Grey", "Yellow"],
    tags: ["bestseller", "new"],
    rating: 4.8,
    reviews: 24,
    dateAdded: "2026-09-10",
    short: "Premium 6V electric ride-on motorcycle with 2.4GHz remote control, foot accelerator, and MP3 music player.",
    description:
      "The IK-001 Bike ST-011 is a thrilling 3-wheel electric ride-on motorcycle designed for kids aged 1–6 years. Featuring dual control with 2.4GHz wireless remote for parents and foot accelerator pedal for kids, this ride-on includes LED lighting in full body and wheel, powerful MP3 music player (Bluetooth, USB & AUX), and a comfortable large seat. Powered by a 6V 4.5Ah rechargeable battery with 6-month warranty and charger included.",
    specs: [
      "Age range: 1–6 years",
      "Dual control: 2.4GHz wireless remote + foot accelerator pedal",
      "Battery & power: 6V 4.5Ah battery (6-month warranty) with 6V/1A charger",
      "Speed: 3–4.8 km/hr",
      "Weight capacity: Up to 100 kg",
      "Entertainment: Full body LED light, wheel LED light, MP3 music player (Bluetooth, USB & AUX)",
      "Seating: Comfortable large seat",
      "Dimensions: L79 x B42 x H49 cm",
      "Available colors: White, Red, Blue, Grey, Yellow",
      "Safety certified with IS 15644:2006"
    ]
  },
  {
    id: "ik-002",
    name: "Harley Bike ST-022R",
    category: "motorcycles",
    price: 11000,
    image: "assets/products/ik-002.jpeg",
    colors: ["White", "Blue", "Red", "Yellow"],
    tags: ["bestseller"],
    rating: 4.9,
    reviews: 31,
    dateAdded: "2026-09-10",
    short: "Iconic Harley-style 3-wheel electric ride-on with foot accelerator, 6V battery, and MP3 music player.",
    description:
      "The IK-002 Harley Bike ST-022R brings classic Harley styling to kids' ride-ons. This 3-wheel electric motorcycle is powered by a Big motor and 6V 4.5Ah battery with 6-month warranty. Features foot accelerator pedal for control, MP3 music player with Bluetooth, USB & AUX connectivity, comfortable large seat, and designed for kids aged 1–6 years. Perfect for little riders who love the open road!",
    specs: [
      "Age range: 1–6 years",
      "Foot accelerator pedal control",
      "Powered by Big motor",
      "Battery & power: 6V 4.5Ah battery (6-month warranty) with 6V/1A charger",
      "Speed: 3–4.8 km/hr",
      "Weight capacity: Up to 100 kg",
      "Entertainment: MP3 music player (Bluetooth, USB & AUX)",
      "Seating: Comfortable large seat",
      "Dimensions: L79 x B42 x H49 cm",
      "Available colors: White, Blue, Red, Yellow",
      "Safety certified with IS 15644:2006"
    ]
  },
  {
    id: "ik-003",
    name: "RR1000 Bike ST-4700RR1000",
    category: "motorcycles",
    price: 11000,
    image: "assets/products/ik-003.jpeg",
    colors: ["Black", "White", "Red"],
    tags: ["premium", "new"],
    rating: 4.9,
    reviews: 18,
    dateAdded: "2026-09-10",
    short: "Premium RR1000 sports bike replica with LED lights, music system, speedometer, and 12V battery.",
    description:
      "The IK-003 RR1000 Bike ST-4700RR1000 is a high-performance sports bike ride-on for kids aged 2–8 years. This premium model features LED lighting, integrated music system, hand accelerator and brake system, powerful DULL 390cc motor powered by 12V battery, and an impressive speedometer display. Available in multiple colors with dual-seating options and advanced safety features.",
    specs: [
      "Age range: 2–8 years",
      "Hand accelerator and brake system",
      "Powerful DULL 390cc motor",
      "Battery & power: 12V battery with 12V/1A charger",
      "Speed: 3–4.8 km/hr",
      "Weight capacity: Up to 60 kg",
      "Entertainment: LED light full body, wheel LED, MP3 music player (Bluetooth, USB & AUX), Speedometer",
      "RPG Light in wheel & full body",
      "Dimensions: L115 x B52 x H75 cm",
      "Available colors: Black, White, Red",
      "Safety certified with IS 15644:2006"
    ]
  },
  {
    id: "ik-004",
    name: "Ride On ST 80G Jeep",
    category: "jeeps",
    price: 11000,
    image: "assets/products/ik-004.jpeg",
    colors: ["Red", "Black", "Blue", "White", "Grey"],
    tags: ["bestseller", "new"],
    rating: 4.8,
    reviews: 22,
    dateAdded: "2026-09-10",
    short: "Rugged 12V electric ride-on Jeep with parent remote control, foot accelerator, LED lights, and music system.",
    description:
      "The IK-004 Ride On ST 80G Jeep is an adventurous 12V powered ride-on vehicle designed for kids aged 2–8 years. This rugged jeep features 2-4 wheel drive option, foot accelerator pedal with parental 2.4GHz remote control, integrated mobile app support, powerful LED lights, and MP3 music player with Bluetooth, USB & AUX. Available in 5 vibrant colors with comfortable large seating and impressive all-wheel drive capability.",
    specs: [
      "Age range: 2–8 years",
      "Dual control: 2.4GHz wireless remote + foot accelerator pedal",
      "Battery & power: 12V battery with 12V/1A charger",
      "Speed: 3–8 km/hr",
      "Weight capacity: Up to 100 kg",
      "Entertainment: Powerful LED lights, MP3 music player (Bluetooth, USB & AUX), Mobile app support",
      "Seating: Comfortable large seat",
      "Dimensions: L90 x B65 x H65 cm",
      "Available colors: Red, Black, Blue, White, Grey",
      "All-wheel drive & parental control",
      "Safety certified with IS 15644:2006"
    ]
  }
];

function sanitizeProduct(p) {
  if (!p || typeof p !== "object") return null;
  const name = String(p.name || "Untitled Ride").trim();
  const category = ["motorcycles", "cars", "jeeps"].includes(p.category) ? p.category : "cars";
  const price = Math.max(0, Number(p.price) || 0);
  const image = (p.image && typeof p.image === "string" && p.image.trim()) ? p.image.trim() : "assets/logo.jpeg";
  const colors = Array.isArray(p.colors) && p.colors.length ? p.colors.map(c => String(c).trim()).filter(Boolean) : ["Red", "Black"];
  const tags = Array.isArray(p.tags) ? p.tags.map(t => String(t).trim()).filter(Boolean) : [];
  const rating = Number(p.rating) > 0 ? Number(Number(p.rating).toFixed(1)) : 5.0;
  const reviews = Math.max(0, parseInt(p.reviews, 10) || 0);
  const short = String(p.short || p.description || name).trim();
  const description = String(p.description || short).trim();
  const specs = Array.isArray(p.specs) && p.specs.length ? p.specs.map(s => String(s).trim()).filter(Boolean) : ["Ages 3–8 years", "Battery-powered ride-on", "Safety certified"];
  const dateAdded = p.dateAdded || new Date().toISOString().split("T")[0];
  const id = String(p.id || ("ik-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.floor(100 + Math.random() * 900)));

  return { id, name, category, price, image, colors: colors.length ? colors : ["Red", "Black"], tags, rating, reviews, dateAdded, short, description, specs: specs.length ? specs : ["Ages 3–8 years", "Battery-powered ride-on", "Safety certified"] };
}

function getProducts() {
  try {
    if (localStorage.getItem("indokidz_products_v1")) {
      localStorage.removeItem("indokidz_products_v1");
    }
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      const sanitizedDefaults = DEFAULT_PRODUCTS.map(sanitizeProduct).filter(Boolean);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sanitizedDefaults));
      return [...sanitizedDefaults];
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => {
          if (p && p.id && p.name && p.price !== undefined) return p;
          return sanitizeProduct(p);
        }).filter(Boolean);
      }
      return [];
    } catch (parseError) {
      const sanitizedDefaults = DEFAULT_PRODUCTS.map(sanitizeProduct).filter(Boolean);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sanitizedDefaults));
      return [...sanitizedDefaults];
    }
  } catch (e) {
    return [];
  }
}

let PRODUCTS = getProducts();

function refreshProductsArray() {
  PRODUCTS = getProducts();
  window.dispatchEvent(new StorageEvent("storage", { key: PRODUCTS_KEY, newValue: JSON.stringify(PRODUCTS), url: window.location.href }));
  return PRODUCTS;
}

function getStorageUsage() {
  try {
    let totalChars = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) totalChars += key.length + (localStorage.getItem(key) || "").length;
    }
    const usedBytes = totalChars * 2;
    const usedKB = Math.round(usedBytes / 1024);
    const approxMaxKB = 5120;
    const percentUsed = Math.min(100, Math.round((usedKB / approxMaxKB) * 100));
    return { usedBytes, usedKB, approxMaxKB, percentUsed };
  } catch (e) {
    return { usedBytes: 0, usedKB: 0, approxMaxKB: 5120, percentUsed: 0 };
  }
}

function saveProducts(productsList) {
  try {
    const sanitized = productsList.map(sanitizeProduct).filter(Boolean);
    const serialized = JSON.stringify(sanitized);
    localStorage.setItem(PRODUCTS_KEY, serialized);
    refreshProductsArray();
    return { success: true, count: sanitized.length };
  } catch (e) {
    const isQuota = e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22 || e.code === 1014;
    return { success: false, error: isQuota ? "Browser storage quota exceeded!" : ("Storage save error: " + (e.message || "Unknown error")) };
  }
}

function addProduct(newProd) {
  const sanitized = sanitizeProduct(newProd);
  if (!sanitized) return { success: false, error: "Invalid product data." };
  const list = getProducts();
  let uniqueId = sanitized.id;
  let counter = 1;
  while (list.some((p) => p.id === uniqueId)) {
    uniqueId = `${sanitized.id}-${counter++}`;
  }
  sanitized.id = uniqueId;
  list.unshift(sanitized);
  const result = saveProducts(list);
  if (result.success) result.product = sanitized;
  return result;
}

function updateProduct(id, updatedData) {
  let list = getProducts();
  const index = list.findIndex((p) => p.id === id);
  if (index !== -1) {
    const merged = sanitizeProduct({ ...list[index], ...updatedData, id });
    list[index] = merged;
    const result = saveProducts(list);
    if (result.success) result.product = merged;
    return result;
  }
  return { success: false, error: "Product not found." };
}

function deleteProduct(id) {
  let list = getProducts();
  const updated = list.filter((p) => p.id !== id);
  return saveProducts(updated);
}

function resetProductsToDefault() {
  const sanitizedDefaults = DEFAULT_PRODUCTS.map(sanitizeProduct).filter(Boolean);
  return saveProducts(sanitizedDefaults);
}

function clearAllProducts() {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
    refreshProductsArray();
    return { success: true, message: "All products cleared." };
  } catch (e) {
    return { success: false, error: "Failed to clear products: " + e.message };
  }
}

const CATEGORY_LABELS = { motorcycles: "Motorcycles", cars: "Luxury Cars", jeeps: "Jeeps & Buggies" };

function formatINR(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}

function getProductById(id) {
  if (!id) return undefined;
  const current = getProducts();
  return current.find((p) => p.id === String(id).trim());
}

const COLOR_FILTERS = {
  "Red": "hue-rotate(0deg) saturate(1.2) brightness(1.0)",
  "White": "grayscale(0.3) brightness(1.25) saturate(0.8)",
  "Blue": "hue-rotate(220deg) saturate(1.1) brightness(1.05)",
  "Black": "brightness(0.75) contrast(1.15) saturate(0.9)",
  "Yellow": "hue-rotate(45deg) saturate(1.3) brightness(1.15)",
  "Grey": "grayscale(1) brightness(0.95)",
  "Green": "hue-rotate(120deg) saturate(1.2) brightness(1.05)"
};
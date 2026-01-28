import { defineFlow, defineDerived } from "fractostate";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// --- Cart Flow ---
export const CartFlow = defineFlow("cart", {
  items: [],
} as { items: CartItem[] });

// --- Derived Flows ---
export const CartTotalFlow = defineDerived(
  CartFlow,
  (state) => {
    return state.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  },
  "cart_total",
);

// --- User Flow ---
export const UserFlow = defineFlow("user", {
  name: "Marc Ansene",
  isPremium: true,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marc",
} as {
  name: string;
  isPremium: boolean;
  avatar: string;
});

// --- Shop Flow ---
export const ShopProducts = [
  {
    id: 1,
    name: "Fractal Watch",
    price: 299,
    category: "Accessories",
    image: "⌚",
  },
  { id: 2, name: "Neon Hoodie", price: 89, category: "Apparel", image: "🧥" },
  {
    id: 3,
    name: "Quantum Buds",
    price: 159,
    category: "Electronics",
    image: "🎧",
  },
  {
    id: 4,
    name: "Void Keyboard",
    price: 199,
    category: "Electronics",
    image: "⌨️",
  },
];

export const ShopFlow = defineFlow("shop", {
  loading: false,
  category: "All",
  search: "",
} as {
  loading: boolean;
  category: string;
  search: string;
});

// --- UI / Notification Flow ---
export const UIFlow = defineFlow("ui", {
  cartOpen: false,
  notifications: [],
} as {
  cartOpen: boolean;
  notifications: { id: number; text: string; type: "success" | "error" }[];
});

// --- Checkout Flow ---
export interface CheckoutState {
  isOpen: boolean;
  step: "form" | "success";
  formData: {
    name: string;
    email: string;
    address: string;
  };
  orderId: string | null;
}

export const CheckoutFlow = defineFlow("checkout", {
  isOpen: false,
  step: "form",
  formData: { name: "", email: "", address: "" },
  orderId: null,
} as CheckoutState);

// --- Stress Flow (Concurrency Test) ---
export const StressFlow = defineFlow("stress", {
  counterA: 0,
  counterB: 0,
  lastUpdated: "",
});

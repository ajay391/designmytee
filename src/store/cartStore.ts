import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "id"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const cartItemId = `${item.productId}-${item.size}-${item.color}`;
        const existing = get().items.find((i) => i.id === cartItemId);

        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === cartItemId
                ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, id: cartItemId, quantity: item.quantity ?? 1 }],
          }));
        }
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      total: () => {
        const subtotal = get().subtotal();
        const shipping = subtotal > 0 ? (subtotal >= 999 ? 0 : 99) : 0;
        return subtotal + shipping;
      },
    }),
    { name: "designmytee-cart" }
  )
);

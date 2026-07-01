"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import type { Product } from "@/lib/products";

export interface CartLine {
  lineId: string;
  productId: string;
  name: string;
  price: number;
  seed: string;
  image?: string;
  size: string;
  quantity: number;
}

const STORAGE_KEY = "sl-cart";
const EMPTY_CART: CartLine[] = [];

let cartItems: CartLine[] = EMPTY_CART;
let hydratedFromStorage = false;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }
  listeners.forEach((listener) => listener());
}

function readCart(): CartLine[] {
  if (!hydratedFromStorage && typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) cartItems = JSON.parse(stored) as CartLine[];
    } catch {
      cartItems = EMPTY_CART;
    }
    hydratedFromStorage = true;
  }
  return cartItems;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getServerSnapshot() {
  return EMPTY_CART;
}

function setCartItems(next: CartLine[]) {
  cartItems = next;
  persist();
}

interface CartContextValue {
  items: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, size: string, qty?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, readCart, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, size: string, qty = 1) => {
    const lineId = `${product.id}__${size}`;
    const existing = items.find((line) => line.lineId === lineId);
    const next = existing
      ? items.map((line) =>
          line.lineId === lineId ? { ...line, quantity: line.quantity + qty } : line
        )
      : [
          ...items,
          {
            lineId,
            productId: product.id,
            name: product.name,
            price: product.price,
            seed: product.seed,
            image: product.image,
            size,
            quantity: qty,
          },
        ];
    setCartItems(next);
    setIsOpen(true);
  };

  const removeItem = (lineId: string) => {
    setCartItems(items.filter((line) => line.lineId !== lineId));
  };

  const updateQuantity = (lineId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(lineId);
      return;
    }
    setCartItems(items.map((line) => (line.lineId === lineId ? { ...line, quantity: qty } : line)));
  };

  const clearCart = () => setCartItems([]);

  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

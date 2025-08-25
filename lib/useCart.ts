"use client"
import { useState, useEffect } from "react"

export type CartItem = { id: string; title: string; price: number; image: string; slug?: string; qty: number }

// Simple cart state without zustand dependency
let cartItems: CartItem[] = []
let listeners: (() => void)[] = []

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

const cartActions = {
  add: (item: Omit<CartItem, "qty">, qty = 1) => {
    const existing = cartItems.find((i) => i.id === item.id)
    if (existing) {
      existing.qty += qty
    } else {
      cartItems.push({ ...item, qty })
    }
    notifyListeners()
  },
  addItem: (product: any, qty = 1) => {
    const item = {
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    }
    cartActions.add(item, qty)
  },
  remove: (id: string) => {
    cartItems = cartItems.filter((i) => i.id !== id)
    notifyListeners()
  },
  clear: () => {
    cartItems = []
    notifyListeners()
  },
  setQty: (id: string, qty: number) => {
    const item = cartItems.find((i) => i.id === id)
    if (item) {
      item.qty = qty
      notifyListeners()
    }
  },
}

export const useCart = () => {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const listener = () => forceUpdate({})
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return {
    items: cartItems,
    ...cartActions,
  }
}

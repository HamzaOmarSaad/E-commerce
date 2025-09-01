"use client";
import { AddToCart, adjustQunatity, getProductsCart, removeFromCart } from "@/services/cart";
import { ICart } from "@/types/cart.type";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

interface CartContextType {
  cart: ICart;
  addProduct: (id: string) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  getCartProducts: () => Promise<void>;
  QuantityAdjustion: (id: string,count:number) => Promise<void>;
}

export const cartContext = createContext<CartContextType>({
  cart: {} as ICart,
  addProduct: async () => {},
  removeProduct: async () => {},
  getCartProducts: async () => {},
  QuantityAdjustion: async () => {},
});

function CartContextProvider(props: Props) {

  const { children } = props;
  const [cart, setCart] = useState<ICart>();

  async function getCartProducts() {
    const res = await getProductsCart();
    setCart(res.data);
  }
  async function addProduct(id: string) {
    const data = await AddToCart(id);
    console.log("🚀 ~ addProduct ~ data:", data)
    if (data.status === "success") {
      toast.success(data.message || "item added successfully");
    } else {
      toast.error(data.error || "somthing wrong happened");
    }
    await getCartProducts();
  }
  async function removeProduct(id: string) {
    const data = await removeFromCart(id);
    if (data.status == "success") {
      toast.success(data.message || "item removed successfully");
    } else {
      toast.error(data.error || "somthing wrong happened");
    }
    await getCartProducts();
  }
  async function QuantityAdjustion(id: string,count:number) {
    const data = await adjustQunatity(id,count);
    if (data.status == "success") {
      toast.success(data.message || "item removed successfully");
    } else {
      toast.error(data.error || "somthing wrong happened");
    }
    await getCartProducts();
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  const values: CartContextType = {
    cart: cart as ICart,
    addProduct,
    getCartProducts,
    removeProduct,
    QuantityAdjustion,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
}

export default CartContextProvider;

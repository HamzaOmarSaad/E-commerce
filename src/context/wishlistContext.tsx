"use client";
import React, { createContext, ReactNode } from "react";
import {
  AddToWishlist,
  getProductsWishlist,
  removeFromWishlist,
} from "@/services/wishlist";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

export const wishlistContext = createContext({});

function WishlistContextProvider(props: Props) {
  const { children } = props;
    const [wishlist, setWishlist] = useState(null);
    
  async function getProductswishlist() {
    const res = await getProductsWishlist();
    setWishlist(res.data);
  }
  async function addWishlistProduct(id: string) {
    const data = await AddToWishlist(id);
    console.log("🚀 ~ addProduct ~ data:", data);
    if (data.status === "success") {
      toast.success(data.message || "item added successfully");
    } else {
      toast.error(data.error || "somthing wrong happened");
    }
    await getProductswishlist();
  }
  async function removeWishlistProduct(id: string) {
    const data = await removeFromWishlist(id);
    console.log("🚀 ~ removeProduct ~ data:", data);
    if (data.status == "success") {
      toast.success(data.message || "item removed successfully");
    } else {
      toast.error(data.error || "somthing wrong happened");
    }
    await getProductswishlist();
  }

  useEffect(() => {
    getProductswishlist();
  }, []);

    const values = {
      wishlist,
      addWishlistProduct,
      removeWishlistProduct,
    };
  return <wishlistContext.Provider value={values}>{children}</wishlistContext.Provider>;
}

export default WishlistContextProvider;

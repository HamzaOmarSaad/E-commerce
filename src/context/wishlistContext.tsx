
"use client";
import React, { createContext, ReactNode, useEffect, useState, useContext } from "react";
import {
  AddToWishlist,
  getProductsWishlist,
  removeFromWishlist,
} from "@/services/wishlist";
import { toast } from "sonner";
import { IWishlist } from "@/types/wishlist.type ";

interface Props {
  children: ReactNode;
}

interface WishlistContextType {
  wishlist: IWishlist | null;
  addWishlistProduct: (id: string) => Promise<void>;
  removeWishlistProduct: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlist: null,
  addWishlistProduct: async () => {},
  removeWishlistProduct: async () => {},
  isLoading: false,
});

// Custom hook
export const useWishlist = () => {
  const context = useContext(wishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistContextProvider");
  }
  return context;
};

// Your provider component remains the same...
function WishlistContextProvider(props: Props) {
  const { children } = props;
  const [wishlist, setWishlist] = useState<IWishlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getProductswishlist() {
    try {
      setIsLoading(true);
      const res = await getProductsWishlist();
      setWishlist(res.data || null);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function addWishlistProduct(id: string) {
    try {
      const data = await AddToWishlist(id);
      console.log("🚀 ~ addProduct ~ data:", data);

      if (data.status === "success") {
        toast.success(data.message || "Item added successfully");
        await getProductswishlist(); 
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add item to wishlist");
    }
  }

  async function removeWishlistProduct(id: string) {
    try {
      const data = await removeFromWishlist(id);
      console.log("🚀 ~ removeProduct ~ data:", data);

      if (data.status === "success") {
        toast.success(data.message || "Item removed successfully");
        await getProductswishlist(); // Refresh wishlist after successful removal
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  }

  useEffect(() => {
    getProductswishlist();
  }, []);

  const values: WishlistContextType = {
    wishlist,
    addWishlistProduct,
    removeWishlistProduct,
    isLoading
  };

  return (
    <wishlistContext.Provider value={values}>
      {children}
    </wishlistContext.Provider>
  );
}

export default WishlistContextProvider;

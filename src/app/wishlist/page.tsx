"use client";
import React, { useContext } from "react";
import WishlistCard from "../_components/wishlistCard";
import { wishlistContext } from "@/context/wishlistContext";
import { Iproduct } from "@/types/product.type";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ShoppingCart } from "iconsax-reactjs";

function Page() {
  const { wishlist, isLoading } = useContext(wishlistContext);
  console.log("🚀 ~ Page ~ wishlist:", wishlist)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-3xl text-center font-bold mb-8">Your Wishlist</h1>

      {isLoading ? (
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[...Array(8)].map((_, idx) => (
            <div className="border rounded-2xl p-4" key={idx}>
              <Skeleton className="h-48 w-full mb-4 rounded-xl" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : !wishlist ? (
        <div className="text-center mt-20">
          <p className="text-xl">Failed to load wishlist</p>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <ShoppingCart size="64" className="mx-auto mb-4 text-gray-400" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Empty Wishlist
            </h2>
            <p className="text-gray-600 mb-8">
              You havent added any items to your wishlist yet. Start exploring
              and add your favorite products!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-colors"
            >
              Go Shopping
              <ShoppingCart size="20" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 mb-6">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in your
            wishlist
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product: Iproduct) => (
              <WishlistCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

"use client";
import React, { useContext } from "react";
import WishlistCard from "../_components/wishlistCard";
import { wishlistContext } from "@/context/wishlistContext";
import { Iproduct } from "@/types/product.type";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ShoppingCart } from "iconsax-reactjs";

function Page() {
  const { wishlist } = useContext(wishlistContext);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl text-center font-bold">Your Wishlist</h1>
      {!wishlist ? (
        <div className="elements flex gap-3 my-5 mx-auto">
          {[...Array(3)].map((_, idx) => (
            <div
              className="order-summary border rounded-2xl p-4 md:w-30/100 my-5 md:my-0"
              key={idx}
            >
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="wishlist">
          {wishlist.length === 0 ? (
            <div className="emptyMsg text-center mt-30">
              <p className="text-4xl my-4 font-bold ">Empty Wishlist</p>
              <p className="text-sm mb-10">Add some Elements</p>
              <Link
                href="/"
                className="w-40 bg-black text-white mx-auto p-4 rounded-2xl mb-10 inline-block"
              >
                Go shopping
                <ShoppingCart className="inline-block mx-3" />
              </Link>
            </div>
          ) : (
            <div className="products grid md:grid-cols-4 gap-3 m-9">
              {wishlist?.map((product: Iproduct) => (
                <WishlistCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;

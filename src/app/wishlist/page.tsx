"use client";
import React, { useContext } from "react";
import WishlistCard from "../_components/wishlistCard";
import { wishlistContext } from "@/context/wishlistContext";
import { Iproduct } from "@/types/product.type";

function Page() {
  const { wishlist } = useContext(wishlistContext);

  return (
    <div className="wishlist">
      <h1 className="text-3xl text-center font-bold">your wishlist</h1>
      <div className="products grid md:grid-cols-4 gap-3 m-9">
        {wishlist?.map((product: Iproduct) => (
          <WishlistCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Page;

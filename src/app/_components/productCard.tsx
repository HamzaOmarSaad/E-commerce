"use client";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";
import { wishlistContext } from "@/context/wishlistContext";
import { Iproduct } from "@/types/product.type";
import { Heart } from "iconsax-reactjs";
import { ShoppingCartIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Loader2 } from "lucide-react";

function ProductCard({ product }: { product: Iproduct }) {
  const { addProduct } = useContext(cartContext);
  const { addWishlistProduct } = useContext(wishlistContext);
  const [isAdding, setIsAdding] = useState(false);

  async function handleAdd() {
    try {
      setIsAdding(true);
      await addProduct(product._id);
    } finally {
      setIsAdding(false);
    }
  }
  return (
    <div className="card bg-zinc-300 p-4 sm:h-190 md:h-180 flex flex-col  justify-between rounded-2xl relative ">
      <Button className="bg-white w-10 absolute rounded-4xl end-5" onClick={() => addWishlistProduct(product._id)}>
        <Heart size="32" color="#f00"  />
      </Button>
      <Link href={`/productDetails/${product.id}`}>
        <div className="card-img ">
          <Image
            src={product.imageCover}
            alt=""
            width={350}
            height={100}
            className=" rounded-2xl mx-auto w-fit"
          />
        </div>
        <div className="card-info">
          <p className="text-2xl my-3 ">
            {product.title.split(" ").splice(0, 4).join(" ")}
          </p>
          <p className="bg-blue-300 w-fit rounded-2xl px-2">
            {product.category.name}
          </p>

          <div className="icons flex justify-between p-2">
            <div>{product.price} EGP</div>
            <div className="flex items-center">
              <Star size="16" color="yellow" fill="yellow" />
              <span className="p-2">{product.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="buttons  group-hover:block ">
        <Button
          className="w-90/100 p-4 m-4"
          onClick={handleAdd}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCartIcon size="32" color="#FF8A65" />
              Add to cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;

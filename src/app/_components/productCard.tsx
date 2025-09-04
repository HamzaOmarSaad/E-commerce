"use client";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";
import { wishlistContext } from "@/context/wishlistContext";
import { Iproduct } from "@/types/product.type";
import { Heart } from "iconsax-reactjs";
import { ShoppingCartIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function ProductCard({ product }: { product: Iproduct }) {
  const { addProduct } = useContext(cartContext);
  const { addWishlistProduct } = useContext(wishlistContext);
  return (
    <div className="card bg-zinc-300 p-4 group h-160 flex flex-col  justify-between rounded-2xl ">
      <Link href={`/productDetails/${product.id}`}>
        <div className="card-img ">
          <Image
            src={product.imageCover}
            alt=""
            width={300}
            height={100}
            className=" rounded-2xl mx-auto"
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
          className="w-70/100 p-4 m-4"
          onClick={() => addProduct(product._id)}
        >
          <ShoppingCartIcon size="32" color="#FF8A65" />
          Add to cart
        </Button>
        <Button onClick={() => addWishlistProduct(product._id)}>
          <Heart size="32" color="#FF8A65" />
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;

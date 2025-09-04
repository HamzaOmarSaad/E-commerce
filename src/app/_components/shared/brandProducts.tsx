// products from the same category
import { getSpecificBrandProducts } from "@/services/brand";
import Link from "next/link";
import React from "react";
import ProductCard from "../productCard";
import { Iproduct } from "@/types/product.type";
import { ShoppingCart } from "iconsax-reactjs";

interface Props {
  brandId: string;
}

async function BrandProducts(props: Props) {
  const { brandId } = props;
  const data = await getSpecificBrandProducts(brandId);
  console.log("🚀 ~ BrandProducts ~ data:", data);

  if (data.data.length) {
    return (
      <div className="products mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((p: Iproduct) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="emptyMsg text-center w-full">
        <p className="text-4xl my-4 font-bold">No elements in this brand</p>
        <p className="text-sm mb-10">See another one</p>
        <Link
          href="/brands"
          className="w-40 bg-black text-white p-4 rounded-2xl mb-10 inline-block"
        >
          Go to brands
          <ShoppingCart className="inline-block mx-3" />
        </Link>
      </div>
    );
  }
}

export default BrandProducts;

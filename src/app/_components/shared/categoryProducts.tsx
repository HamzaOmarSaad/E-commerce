// products from the same category
import { getSpecificCategories } from "@/services/categories";
import Link from "next/link";
import React from "react";
import ProductCard from "../productCard";
import { Iproduct } from "@/types/product.type";
import { ShoppingCart } from "iconsax-reactjs";

interface Props {
  categoryId: string;
}

async function CategoryProducts(props: Props) {
  const { categoryId } = props;
  const data = await getSpecificCategories(categoryId);
  console.log("🚀 ~ CategoryProducts ~ data:", data);

  return data.data.length ? (
    <div className="products mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.data.map((p: Iproduct) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  ) : (
    <div className="emptyMsg text-center w-full">
      <p className="text-4xl my-4 font-bold">No elements in this category</p>
      <p className="text-sm mb-10">See another one</p>
      <Link
        href="/categories"
        className="w-40 bg-black text-white p-4 rounded-2xl mb-10 inline-block"
      >
        Go to categories
        <ShoppingCart className="inline-block mx-3" />
      </Link>
    </div>
  );
}

export default CategoryProducts;

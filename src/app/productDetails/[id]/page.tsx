import { getProductDetails } from "@/services/products";
import React from "react";
import ProductDetails from "../../_components/productDetails";
import ProductCard from "@/app/_components/productCard";
import { Iproduct } from "@/types/product.type";
import { getSpecificCategories } from "@/services/categories";

interface Props {
  params: {
    id: string;
  };
}

async function Page(props: Props) {
  const { params } = props;
  const id = params.id;

  const data = await getProductDetails(id);
  const categorydata = await getSpecificCategories(data.data?.category?._id);

  return (
    <div className="w-90/100 mx-auto">
      <ProductDetails product={data} />
      <p className="text-4xl font-bold text-center  p-5">more you can like</p>
      {data.data?.category?._id && (
        <div className="products mx-auto grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categorydata.data.map((p: Iproduct) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;

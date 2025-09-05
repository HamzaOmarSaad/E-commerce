import { getProductDetails } from "@/services/products";
import React from "react";
import ProductDetails from "../../_components/productDetails";
import CategoryProducts from "@/app/_components/shared/categoryProducts";


interface Props {
  params: {
    id: string;
  };
}

async function Page(props: Props) {
  const { params } = props;
  const id = params.id;

  const data = await getProductDetails(id);

  return (
    <div className="w-90/100 mx-auto">
      <ProductDetails product={data} />
      <p className="text-4xl font-bold text-center  p-5">more you can like</p>
      {data.data?.category?._id && (
        <CategoryProducts categoryId={data.data.category._id} />
      )}
    </div>
  );
}

export default Page;

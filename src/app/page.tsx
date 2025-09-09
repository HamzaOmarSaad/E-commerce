import { Iproduct } from "@/types/product.type";
import CategorySlider from "./_components/categorySlider";
import MainSlider from "./_components/mainSlider";
import ProductCard from "./_components/productCard";
import { getAllProduct } from "@/services/products";

async function Page() {
  const products = await getAllProduct();
  console.log("🚀 ~ Page ~ products:", products)

  return (
    <>
      <div className="overflow-hidden p-4 my-4 bg-zinc-300">
        <div className="p-4 z-0">
          <MainSlider />
        </div>
        <div className="my-4">
          <CategorySlider />
        </div>
      </div>

      {products ? (
        <div className="products container mx-auto grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.map((p: Iproduct) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}

export default Page;

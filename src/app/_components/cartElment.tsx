import { cartContext } from "@/context/cartContext";
import { ProductElement } from "@/types/cart.type";
import { Trash } from "iconsax-reactjs";
import Image from "next/image";
import React, { useContext } from "react";

function CartElment({ product }: { product: ProductElement }) {
  const { addProduct, removeProduct, QuantityAdjustion } =
    useContext(cartContext);

  return (
    <>
      <div className="element flex m-5 gap-3">
        <div className="product-img">
          <Image
            src={product.product?.imageCover}
            alt="hello"
            width={150}
            height={150}
            className="bg-zinc-300 rounded-2xl p-1"
          />
        </div>
        <div className="product-info w-full p-2">
          <div className="title-trash flex items-center justify-between">
            <h1 className="text-3xl">{product.product?.title}</h1>

            <button onClick={() => removeProduct(product.product._id)}>
              <Trash size="30" color="red" />
            </button>
          </div>
          <div className="info">
            <div className="brand flex items-center text-sm">
              <span>brand : </span>
              <Image
                src={product.product?.brand?.image as string}
                alt="hello"
                width={50}
                height={50}
                className=""
              />
            </div>
            <div className="category text-sm pb-4">
              <span>category : {product.product?.category?.name}</span>
            </div>
            <div className="priceAndQuantity flex justify-between">
              <div className="text-2xl font-bold">{product.price} EGP</div>
              <div className="bg-zinc-300 text-2xl rounded-2xl px-6 py-1 flex items-center justify-between w-30 ">
                <button
                  className="text-3xl cursor-pointer"
                  onClick={() =>
                    QuantityAdjustion(product.product._id, product.count - 1)
                  }
                >
                  -
                </button>
                {product.count}
                <button
                  className="text-3xl cursor-pointer"
                  onClick={() => addProduct(product.product._id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <hr className="w-90/100 mx-auto" />
    </>
  );
}

export default CartElment;

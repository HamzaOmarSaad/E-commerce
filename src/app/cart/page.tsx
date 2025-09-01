"use client";
import React, { useContext } from "react";
import CartElment from "../_components/cartElment";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";
import { ProductElement } from "@/types/cart.type";

function Page() {
  const { cart } = useContext(cartContext);
  console.log("🚀 ~ Page ~ cart:", cart);
  return (
    <div className="cart">
      <p className="font-bold text-center text-4xl mb-10">Your cart</p>
      { !cart? "loading":
        cart?.products?.length === 0 ? (
        <div className="emptyMsg text-center">
          <p className="text-3xl my-4 ">Empty cart</p>
          <span className="text-sm mb-30">add some elments</span>
        </div>
      ) : (
        <div className=" cart-content md:flex w-90/100 mx-auto gap-4 items-start">
          <div className="elements border rounded-2xl md:w-60/100">
            {cart?.products?.map((product: ProductElement) => (
              <CartElment key={product._id} product={product} />
            ))}
          </div>
          <div className="order-summary border rounded-2xl p-4 md:w-30/100 my-4 md:my-0">
            <h1 className="text-3xl font-bold">order summary</h1>

            <div className="subtotal py-7">
              <div className="total flex justify-between">
                <span className="text-zinc-400">sub total</span>
                <span className="font-bold">{cart?.totalCartPrice} EGP</span>
              </div>
            </div>
            <div className="discount pb-7">
              <div className="total flex justify-between">
                <span className="text-zinc-400">discount</span>
                <span className="font-bold text-red-600">-0 EGP</span>
              </div>
            </div>
            <div className="delvery pb-5 ">
              <div className="total flex justify-between">
                <span className="text-zinc-400">delivery</span>
                <span className="font-bold">15 EGP</span>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="total pt-5 ">
              <div className="total flex justify-between text-3xl">
                <span className="font-bold">total</span>
                <span className="font-bold">
                  {cart?.totalCartPrice + 15} EGP
                </span>
              </div>
            </div>
            <Button className="w-full my-7">Go to checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

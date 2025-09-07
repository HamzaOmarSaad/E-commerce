"use client";
import { getAllOrders } from "@/services/allOrders";
import { IOrder } from "@/types/order.type";
import { Loader2, Package, CreditCard, Calendar } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  async function getOrders(userId: string) {
    setLoading(true);
    try {
      const res = await getAllOrders(userId);

      if (res.error) {
        toast.error("Failed to load orders");
      } else {
        setOrders(res);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders(localStorage.getItem("owner") as string);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No Orders Found
          </h2>
          <p className="text-gray-500">You havent placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Order #{order._id.slice(-8)}
                </h3>
                <p className="text-gray-600 text-sm">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {order.totalOrderPrice} EGP
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.isPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.isDelivered
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Order Items
                </h4>
                <div className="space-y-3">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">
                          {item.product.title}
                        </h5>
                        <p className="text-gray-600 text-xs">
                          {item.product.category.name}
                        </p>
                        <p className="text-sm font-semibold">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Details
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm capitalize text-gray-600">
                      {order.paymentMethodType}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">Order Summary</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        Subtotal:{" "}
                        {order.totalOrderPrice -
                          order.taxPrice -
                          order.shippingPrice}{" "}
                        EGP
                      </p>
                      <p>Tax: {order.taxPrice} EGP</p>
                      <p>Shipping: {order.shippingPrice} EGP</p>
                      <p className="font-semibold text-black">
                        Total: {order.totalOrderPrice} EGP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;

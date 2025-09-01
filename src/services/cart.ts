"use server";
import { getToken } from "@/services/token";

export async function getProductsCart() {
  const token = await getToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "get",

    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

export async function AddToCart(id: string) {
  const token = await getToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",

    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}
export async function removeFromCart(id: string) {
  const token = await getToken();
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",

    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

export async function adjustQunatity(id: string, count: number) {
  const token = await getToken();
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",

    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count: count,
    }),
  });

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

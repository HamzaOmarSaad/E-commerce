import { getToken } from "./token";

export async function COD(cartID: string, info: object) {
  const token = await getToken();
  console.log("🚀 ~ Visa ~ token:", token);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
    {
      method: "POST",

      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info,
      }),
    }
  );
  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();  
  return data;
}

export async function Visa(cartID: string, info: object) {
  const token = await getToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }`,
    {
      method: "POST",

      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info,
      }),
    }
  );
  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

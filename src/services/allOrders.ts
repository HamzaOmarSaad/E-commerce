export async function getAllOrders(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  );

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

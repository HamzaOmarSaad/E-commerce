export async function getAllProduct() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}
export async function getProductDetails(id:string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

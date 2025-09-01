export async function getCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}
export async function getSpecificCategories(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
  );

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

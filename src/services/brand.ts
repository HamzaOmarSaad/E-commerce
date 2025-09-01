export async function getAllBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}

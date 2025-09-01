"use client";
import { getAllBrands } from "@/services/brand";
import { IBrands } from "@/types/brands.types ";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Page() {
  const [brands, setBrands] = useState<IBrands[]>([]);
  console.log("🚀 ~ Page ~ brands:", brands);

  useEffect(() => {
    async function fetchBrands() {
      const res = await getAllBrands();
      setBrands(res.data);
    }
    fetchBrands();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {brands?.map((category: IBrands) => (
        <div className="flex flex-col" key={category._id}>
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={400}
            className="size-80 rounded-3xl"
          />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Page;

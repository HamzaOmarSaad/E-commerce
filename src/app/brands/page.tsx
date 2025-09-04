"use client";
import { getAllBrands } from "@/services/brand";
import { IBrands } from "@/types/brands.types ";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [brands, setBrands] = useState<IBrands[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      const res = await getAllBrands();
      setBrands(res.data);
    }
    fetchBrands();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {brands?.map((brand: IBrands) => (
        <Link href={`/brands/${brand._id}`} key={brand._id}>
          <div className="flex flex-col" key={brand._id}>
            <Image
              src={brand.image}
              alt={brand.name}
              width={300}
              height={400}
              className="size-80 rounded-3xl"
            />
            <p>{brand.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Page;

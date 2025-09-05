"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBrands } from "@/services/brand";
import { IBrands } from "@/types/brands.types ";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [brands, setBrands] = useState<IBrands[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      const res = await getAllBrands();
      setBrands(res.data);
      setLoading(false);
    }
    fetchBrands();
  }, []);

  return (
    <>
      {loading ? (
        <div className="elements  flex justify-between flex-wrap ">
          {[...Array(4)].map((_, idx) => (
            <div
              className="order-summary  rounded-2xl p-4 md:w-25/100 my-5 md:my-0"
              key={idx}
            >
              <Skeleton className="h-50 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </div>
          ))}          {[...Array(4)].map((_, idx) => (
            <div
              className="order-summary  rounded-2xl p-4 md:w-25/100 my-5 md:my-0"
              key={idx}
            >
              <Skeleton className="h-50 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Page;

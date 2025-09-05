"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/services/categories";
import { ICategories } from "@/types/category.types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);

      const res = await getCategories();
      setCategories(res.data);
      setLoading(false);
    }
    fetchCategories();
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
              <Skeleton className="h-60 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </div>
          ))}{" "}
          {[...Array(4)].map((_, idx) => (
            <div
              className="order-summary  rounded-2xl p-4 md:w-25/100 my-5 md:my-0"
              key={idx}
            >
              <Skeleton className="h-60 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.map((category: ICategories) => (
            <Link href={`/categories/${category._id}`} key={category._id}>
              <div className="flex flex-col">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={400}
                  className="size-80 rounded-3xl"
                />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Page;

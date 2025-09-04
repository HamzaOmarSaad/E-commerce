"use client";
import { getCategories } from "@/services/categories";
import { ICategories } from "@/types/category.types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  console.log("🚀 ~ Page ~ categories:", categories);

  useEffect(() => {
    async function fetchCategories() {
      const res = await getCategories();
      setCategories(res.data);
    }
    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.map((category: ICategories) => (
        <Link href={`/categories/${category._id}`} key={category._id}>
          <div className="flex flex-col" >
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
  );
}

export default Page;


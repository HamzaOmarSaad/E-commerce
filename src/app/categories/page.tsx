"use client";
import { getCategories } from "@/services/categories";
import { ICategories } from "@/types/category.types";
import Image from "next/image";
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

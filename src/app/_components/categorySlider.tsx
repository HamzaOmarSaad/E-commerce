"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getCategories } from "@/services/categories";
import { ICategories } from "@/types/category.types";

function CategorySlider() {
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await getCategories();
      setCategories(res.data || []);
    }
    fetchCategories();
  }, []);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

  return (
    <Slider {...settings}>
      {categories.map((category: ICategories, id: number) => (
        <div className="flex flex-col" key={id}>
          <Image
            src={category?.image}
            alt=""
            width={400}
            height={400}
            className="size-50"
          />
          <p>{category?.name}</p>
        </div>
      ))}
    </Slider>
  );
}

export default CategorySlider;

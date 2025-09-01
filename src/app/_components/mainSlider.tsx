"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay:true,
  };
  return (
    <Slider {...settings}>
      <div>
        <Image
          src="/image3.png"
          alt=""
          width={500}
          height={200}
          className="mx-auto size-100 w-500"
        />
      </div>
      <div>
        <Image
          src="/image2.png"
          alt=""
          width={500}
          height={200}
          className="mx-auto size-100 w-500"
        />
      </div>
    </Slider>
  );
}

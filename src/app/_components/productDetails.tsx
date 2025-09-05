"use client";
import { IDetails } from "@/types/product.type";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Activity, Alarm, Heart } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import { wishlistContext } from "@/context/wishlistContext";

interface Props {
  product: {
    data: IDetails;
  };
}

function ProductDetails(props: Props) {
  const { product } = props;
  const { addProduct } = useContext(cartContext);
    const { addWishlistProduct } = useContext(wishlistContext);
  
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="product-details grid grid-cols-1 lg:grid-cols-2">
        <div className="product-img w-100 ">
          <Slider {...settings}>
            {product.data?.images?.map((img, id: number) => (
              <div className="flex flex-col " key={id}>
                <Image
                  src={img}
                  alt=""
                  width={300}
                  height={400}
                  className="size-100 "
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="product-info">
          <div className="header flex items-center justify-between">
            <h1 className="text-4xl font-bold">{product?.data?.title}</h1>
            <Image
              src={product.data?.brand?.image as string}
              alt=""
              width={300}
              height={400}
              className="size-20 "
            />
          </div>
          <div className=" rating flex items-center">
            {Array.from(
              { length: product?.data?.ratingsAverage },
              (_, index) => (
                <Star
                  key={index}
                  className="text-yellow-400 me-2"
                  size="16"
                  fill="yellow"
                />
              )
            )}
            <span>{product?.data?.ratingsAverage}/5</span>
          </div>
          <div className="my-4"> price : {product.data?.price} EGP</div>
          <div className="description  my-6">
            <p className="font-bold">description:</p>
            <p className="text-sm text-zinc-500">{product.data?.description}</p>
          </div>

          <div className="stock flex gap-20">
            <div className="avilable flex items-center gap-4">
              <Alarm size="32" />
              <div className="info">
                <p className="font-bold">avilable stock</p>
                <p>{product.data?.quantity} units</p>
              </div>
            </div>
            <div className="sold flex items-center gap-4">
              <Activity size="32" />
              <div className="info">
                <p className="font-bold"> sold items</p>
                <p>{product.data?.sold}</p>
              </div>
            </div>
          </div>

          <div className="Category flex gap-2 items-center">
            <span className="mt-3 font-bold">category:</span>
            <div className="bg-blue-200 w-fit py-2 rounded-3xl mt-4 ">
              {product.data?.category?.name}
            </div>
          </div>
          <div className="product-buttons">
            <Button
              className="w-80/100 p-4 m-4"
              onClick={() => addProduct(product?.data?._id)}
            >
              Add to cart
            </Button>
            <Button onClick={() => addWishlistProduct(product?.data?._id)}>
              <Heart size="32" color="#FF8A65" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

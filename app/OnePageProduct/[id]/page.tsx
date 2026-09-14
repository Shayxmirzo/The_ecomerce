"use client";

import useGet from "@/app/hooks/useGet";
import type { ProductTypes } from "@/app/Types/ProductTypes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

function OnePage() {
  const { id } = useParams<{ id: string }>();
  const { data: products = [] } = useGet<ProductTypes[]>("products");
  const product = products.find((item) => String(item.id) === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const getOldPrice = (product: ProductTypes) => {
    if (!product.discountPercentage) return null;

    return product.price / (1 - product.discountPercentage / 100);
  };
  return (
    <div className="container mx-auto pt-20 pb-40">
      {product ? 
        <div className="flex items-start justify-center w-full gap-10">
            <div className="flex items-start gap-3">
                <div className="flex flex-col gap-3 overflow-hidden">
                    {product.images?.slice(0, 3).map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        onClick={() => setSelectedImage(image)}
                        className="relative h-35 w-38 overflow-hidden rounded-[20px] bg-[#F0EEED]"
                        aria-label={`Show ${product.title} view ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${product.title} view ${index + 1}`}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      </button>
                    ))}
                </div>
                <div className="p-1 bg-[#F0EEED] rounded-[20px]">
                    <Image
                      src={selectedImage ?? product.thumbnail}
                      alt={product.title}
                      width={450}
                      height={520}
                    />
                </div>
            </div>
            <div className="">
                <div className="">
                    <h1 className=" line-clamp-1 text-sm font-black md:text-[40px]">{product.title}</h1>
                  <div className="flex items-end gap-1 md:gap-2" aria-label={`${product.rating} out of 5 stars`}>
                    <span className="text-sm text-[#FFC633] md:text-4xl" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>{index < Math.round(product.rating) ? "★" : "☆"}</span>
                      ))}
                    </span>
                    <span className="text-xs font-black md:text-[32px]">{product.rating.toFixed(1)}/5</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg font-bold md:text-[32px]">${product.price.toFixed(0)}</span>
                    {getOldPrice(product) !== null && (
                      <span className="text-[32px] font-black text-black/40 line-through md:text-2xl">
                        ${getOldPrice(product)?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-w-150 pb-5 border-b border-[gray]">
                    <p className="text-[#00000099] font-medium">{product.description}</p>
                </div>
                <div className="py-6">
                    <button className="max-w-100 w-full rounded-full py-4 bg-[black] text-white font-medium hover:bg-[gray] duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div> 
        : 
        <p>Product not found.</p>}
    </div>
  );
}

export default OnePage;

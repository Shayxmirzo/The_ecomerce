"use client";

import useGet from "@/app/hooks/useGet";
import type { ProductTypes } from "@/app/Types/ProductTypes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const review = {
  name: "Sarah M.",
  review:
    '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations. The quality is excellent, delivery is quick, and every item feels carefully made."',
};

function OnePagePart() {
  const { id } = useParams<{ id: string }>();
  const { data: products = [] } = useGet<ProductTypes[]>("products");
  const product = products.find((item) => String(item.id) === id);
    const getOldPrice = (product: ProductTypes) => {
    if (!product.discountPercentage) return null;

    return product.price / (1 - product.discountPercentage / 100);
  };
  return (
    <div className="container mx-auto pt-8 pb-0">
      {product ? 
        <div className="flex flex-col gap-7">
            <div className="px-5 grid w-full border-b border-[gray] pb-20 items-start gap-10 md:grid-cols-2">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#F0EEED] p-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                    />
            </div>
              <div className="w-full">
                <div className="">
                  <h1 className="line-clamp-1 w-full text-[20px] font-black md:text-[40px]">{product.title}</h1>
                  <div className="flex items-end gap-1 md:gap-2" aria-label={`${product.rating.rate} out of 5 stars`}>
                    <span className="text-sm text-[#FFC633] md:text-4xl" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>{index < Math.round(product.rating.rate) ? "★" : "☆"}</span>
                      ))}
                    </span>
                    <span className="text-xs font-black md:text-[32px]">{product.rating.rate.toFixed(1)}/5</span>
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
                <div className="w-full md:border-b border-[gray] pb-5">
                    <p className="text-[#00000099] text-[16px] font-medium md:text-[20px]">{product.description}</p>
                </div>
                <div className="py-6">
                    <button className="w-full rounded-full bg-[black] py-4 text-white font-medium duration-300 hover:bg-[gray]">
                        Add to Cart
                    </button>
                </div>
            </div>
            </div> 
            <div className="px-5 md:pt-10 flex flex-col gap-3">
                <h1 className="line-clamp-1 w-full text-[20px] font-black md:text-[48px]">Product details</h1>
                <div className="flex flex-col gap-2">
                    <h1 className=" w-full text-[20px] font-black md:text-[40px]">Category type: {product.category}</h1>
                <p className="text-[16px] text-[#00000099] md:text-[20px] font-medium">{product.description}</p>
                </div>
            </div>
            <section className="overflow-hidden py-20">
                  <div className="container mx-auto">
                    <div className="mb-8 flex items-center justify-between gap-6 px-4 md:px-0">
                      <h2 className="text-3xl font-black uppercase md:text-5xl">
                        Rating & reviews
                      </h2>
                      <div className="flex shrink-0 items-center gap-5">
                        <button type="button" className="comments-prev text-2xl leading-none transition-opacity hover:opacity-50" aria-label="Previous customer review">
                          ←
                        </button>
                        <button type="button" className="comments-next text-2xl leading-none transition-opacity hover:opacity-50" aria-label="Next customer review">
                          →
                        </button>
                      </div>
                    </div>
            
                    <Swiper
                      modules={[Autoplay, Navigation]}
                      navigation={{ prevEl: ".comments-prev", nextEl: ".comments-next" }}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      loop
                      spaceBetween={12}
                      slidesPerView={1}
                      breakpoints={{
                        640: { slidesPerView: 2.15, spaceBetween: 16 },
                        1024: { slidesPerView: 3.15, spaceBetween: 16 },
                      }}
                      className="overflow-visible!"
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <SwiperSlide key={`${review.name}-${index}`}>
                          <article className="h-full min-h-32 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                            <div className="mb-3 text-lg leading-none text-[#FFC633]" aria-label="5 out of 5 stars">
                              <span aria-hidden="true">★★★★★</span>
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <h3 className="font-bold">{review.name}</h3>
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] text-[10px] font-bold text-white" aria-label="Verified customer">
                                ✓
                              </span>
                            </div>
                            <p className="text-xs leading-5 text-black/60">{review.review}</p>
                          </article>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </section>
        </div>
        : 
        <p>Product not found.</p>}
    </div>
  );
}

export default OnePagePart;

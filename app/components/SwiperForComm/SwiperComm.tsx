
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const review = {
  name: "Sarah M.",
  review:
    '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations. The quality is excellent, delivery is quick, and every item feels carefully made."',
};

export default function SwiperComm() {
  return (
    <section className="overflow-hidden py-20">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between gap-6 px-4 md:px-0">
          <h2 className="text-3xl font-black uppercase md:text-5xl">
            Our Happy Customers
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
  );
}

import useGet from "@/app/hooks/useGet";
import type { ProductTypes } from "@/app/Types/ProductTypes";
import Image from "next/image";

function ProductPage() {
  const { data: products = [] } = useGet<ProductTypes[]>("products");

  const sortedByRating = [...products].sort(
    (a, b) => b.rating - a.rating
  );
  const sortedByStock = [...products].sort(
    (a, b) => a.stock - b.stock
  )
  const getOldPrice = (product: ProductTypes) => {
    if (!product.discountPercentage) return null;

    return product.price / (1 - product.discountPercentage / 100);
  };
  return (
    <div className="container mx-auto flex flex-col ">
      <div className="flex flex-col border-b py-18 border-[gray] gap-16">
        <div className="flex flex-col gap-16">
          <h1 className="text-[32px] md:text-[48px] font-black text-center">TOP RATING</h1>
        <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {sortedByRating?.slice(0, 4).map((el) => {
            return(
              <div key={el.id} className="flex flex-col gap-2 md:gap-4">
                <div className="group relative aspect-square w-full max-w-75 overflow-hidden rounded-[20px] bg-[#F0EEED] p-2 md:p-8">
                  <Image src={el.thumbnail} className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-110" alt={el.title} fill sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="">
                    <h1 className="max-w-70 line-clamp-1 text-sm font-bold md:text-[20px]">{el.title}</h1>
                  <div className="flex items-center gap-1 md:gap-2" aria-label={`${el.rating} out of 5 stars`}>
                    <span className="text-sm text-[#FFC633] md:text-base" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>{index < Math.round(el.rating) ? "★" : "☆"}</span>
                      ))}
                    </span>
                    <span className="text-xs md:text-sm">{el.rating.toFixed(1)}/5</span>
                  </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg font-bold md:text-2xl">${el.price.toFixed(0)}</span>
                    {getOldPrice(el) !== null && (
                      <span className="text-lg font-bold text-black/40 line-through md:text-2xl">
                        ${getOldPrice(el)?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="text-[black] py-4 px-20 border border-[gray] rounded-full duration-300 hover:bg-[#0000001A] hover:text-[white]">View All</button>
        </div>
      </div>
      <div className="flex flex-col gap-10  pt-18">
        <div className="flex flex-col gap-16">
          <h1 className="text-[32px] md:text-[48px] font-black text-center">TOP SELLING</h1>
        <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {sortedByStock?.slice(0, 4).map((el) => {
            return(
              <div key={el.id} className="flex flex-col gap-2 md:gap-4">
                <div className="group relative aspect-square w-full max-w-75 overflow-hidden rounded-[20px] bg-[#F0EEED] p-2 md:p-8">
                  <Image src={el.thumbnail} className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-110" alt={el.title} fill sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="">
                    <h1 className="max-w-70 line-clamp-1 text-sm font-bold md:text-[20px]">{el.title}</h1>
                  <div className="flex items-center gap-1 md:gap-2" aria-label={`${el.rating} out of 5 stars`}>
                    <span className="text-sm text-[#FFC633] md:text-base" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>{index < Math.round(el.rating) ? "★" : "☆"}</span>
                      ))}
                    </span>
                    <span className="text-xs md:text-sm">{el.rating.toFixed(1)}/5</span>
                  </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg font-bold md:text-2xl">${el.price.toFixed(0)}</span>
                    {getOldPrice(el) !== null && (
                      <span className="text-lg font-bold text-black/40 line-through md:text-2xl">
                        ${getOldPrice(el)?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="text-[black] py-4 px-20 border border-[gray] rounded-full duration-300 hover:bg-[#0000001A] hover:text-[white]">View All</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage
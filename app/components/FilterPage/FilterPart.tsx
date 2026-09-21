"use client"

import useGet from "@/app/hooks/useGet";
import { ProductTypes } from "@/app/Types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Slider } from "@mui/material";
function FilterPart() {
    const [selectCategory, setSelectCategory] = useState<string>("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { data: products = [] } = useGet<ProductTypes[]>("products");
  const maxPrice = Math.max(1000, ...products.map((product) => product.price));
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const categories = [
    ...Array.from(new Set(products.map((product) => product.category))),
  ];
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectCategory === "All" || product.category === selectCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesPrice;
  });

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const formatPrice = (value: number) => `$${value.toFixed(0)}`;

  return (
    <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
      <div className="flex px-5 justify-end md:hidden">
        <button
          type="button"
          onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
          aria-expanded={isFilterOpen}
          className="rounded-full border border-black px-5 py-2 text-sm font-bold"
        >
          {isFilterOpen ? "Hide Filters" : "Filters"}
        </button>
      </div>
      <div className={`${isFilterOpen ? "visible translate-y-0 opacity-100 pointer-events-auto" : "invisible translate-y-full opacity-0 pointer-events-none"} fixed inset-x-0 bottom-16 z-50 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-t-2xl border border-[lightgray] bg-white px-6 shadow-lg transition-[transform,opacity,visibility] duration-500 ease-out md:visible md:sticky md:top-40 md:inset-x-auto md:bottom-auto md:block md:max-h-none md:w-1/4 md:shrink-0 md:translate-y-0 md:overflow-visible md:rounded-2xl md:opacity-100 md:pointer-events-auto md:shadow-none`}>
            <div className="flex items-center justify-between border-b py-5 border-[lightgray]">
                <h1 className="text-[24px] font-bold">Filters</h1>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  aria-label="Close filters"
                  className="text-2xl leading-none text-[gray] hover:text-black md:hidden"
                >
                  X
                </button>
            </div>
            <div className="">
                <div className="flex flex-col gap-2 border-b border-[lightgray] items-start py-5">
                    <button onClick={() => setSelectCategory("All")}  className={`capitalize text-[20px] font-bold text-[gray] ${selectCategory === "All" ? "text-blue-950" : ""} cursor-pointer hover:text-[black] duration-300`}>
                                All
                            </button>
                    {
                        categories?.map((el) => (
                            <button onClick={() => setSelectCategory(el)} key={el} className={`capitalize text-[20px] font-bold text-[gray] ${selectCategory === el ? "text-blue-950" : ""} cursor-pointer hover:text-[black] duration-300`}>
                                {el}
                            </button>
                        ))
                    }
                </div>
                <div className="border-b border-[lightgray] px-1 py-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-[20px] font-bold">Price</h2>
                    <span className="text-sm text-[gray]">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    min={0}
                    max={maxPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={formatPrice}
                    sx={{
                      color: "#000000",
                      "& .MuiSlider-rail": {
                        backgroundColor: "#000000",
                      },
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#000000",
                      },
                    }}
                  />
                </div>
            </div>
        </div>
        <div className="px-5 md:flex w-full min-w-0 flex-col gap-6 md:w-3/4">
            <div className="">
                <h1 className="text-[32px] font-bold capitalize">{selectCategory}</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {filteredProducts.map((el) => (
                    <Link href={`/OnePageProduct/${el.id}`} key={el.id} className="flex flex-col gap-2 md:gap-4">
                  <div className="group relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#F0EEED] p-2 md:p-8">
                    <Image src={el.image} className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-110" alt={el.title} fill sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="line-clamp-1 text-sm font-bold md:text-[20px]">{el.title}</h2>
                    <div className="flex items-center gap-1 md:gap-2" aria-label={`${el.rating.rate} out of 5 stars`}>
                      <span className="text-sm text-[#FFC633] md:text-base" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span key={index}>{index < Math.round(el.rating.rate) ? "★" : "☆"}</span>
                        ))}
                      </span>
                      <span className="text-xs md:text-sm">{el.rating.rate.toFixed(1)}/5</span>
                    </div>
                    <span className="text-lg font-bold md:text-2xl">${el.price.toFixed(2)}</span>
                  </div>
                </Link>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default FilterPart
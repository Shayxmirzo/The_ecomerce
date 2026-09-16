import useGet from "@/app/hooks/useGet";
import type { ProductTypes } from "@/app/Types/ProductTypes";
import Image from "next/image";
import Link from "next/link";

function ProductPage() {
  const { data: products = [] } = useGet<ProductTypes[]>("products");

  const categories = [
    ...Array.from(new Set(products.map((product) => product.category))),
  ];
  return (
    <div className="container mx-auto flex flex-col gap-20 px-4 py-18">
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category
        );

        return (
          <section key={category} className="flex flex-col gap-10">
            <h1 className="text-center text-[32px] font-black uppercase md:text-[48px]">{category}</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {categoryProducts.map((product) => (
                <Link href={`/OnePageProduct/${product.id}`} key={product.id} className="flex flex-col gap-2 md:gap-4">
                  <div className="group relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#F0EEED] p-2 md:p-8">
                    <Image src={product.image} className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-110" alt={product.title} fill sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="line-clamp-1 text-sm font-bold md:text-[20px]">{product.title}</h2>
                    <div className="flex items-center gap-1 md:gap-2" aria-label={`${product.rating.rate} out of 5 stars`}>
                      <span className="text-sm text-[#FFC633] md:text-base" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span key={index}>{index < Math.round(product.rating.rate) ? "★" : "☆"}</span>
                        ))}
                      </span>
                      <span className="text-xs md:text-sm">{product.rating.rate.toFixed(1)}/5</span>
                    </div>
                    <span className="text-lg font-bold md:text-2xl">${product.price.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default ProductPage
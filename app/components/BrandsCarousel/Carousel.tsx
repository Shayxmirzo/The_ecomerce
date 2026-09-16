import Image from "next/image"

function Carousel() {
  const brands: string[] = [
    "/Group.svg",
    "/zara-logo-1 1.svg",
    "/gucci-logo-1 1.svg",
    "/prada-logo-1 1.svg",
    "/Group (1).svg"
  ]
  return (
    <div className="py-3 md:w-full overflow-hidden bg-[black] md:py-11">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0 items-center gap-24 pr-24">
          {brands.map((brand) => (
            <Image
              key={brand}
              src={brand}
              width={160}
              height={36}
              
              alt="brand"
              className="h-5 sm:h-8 md:h-12 w-auto"
            />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-24 pr-24">
          {brands.map((brand) => (
            <Image
              key={`duplicate-${brand}`}
              src={brand}
              width={160}
              height={36}
              alt="brand"
              className="h-5 sm:h-8 md:h-12 w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
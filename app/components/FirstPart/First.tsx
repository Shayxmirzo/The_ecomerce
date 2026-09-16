import Image from "next/image"

function First() {
  return (
    <div className="relative min-h-162.5 bg-[#F2F0F1] overflow-hidden md:min-h-0">
        <div className="absolute inset-x-0 bottom-0 top-80 bg-contain bg-bottom bg-no-repeat md:hidden" style={{ backgroundImage: "url('/Rectangle 2 (1).png')" }} />
        <div className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block" style={{ backgroundImage: "url('/Rectangle 2.png')" }} />
        <div className="container relative mx-auto px-4 py-4 md:px-0 md:py-28 ">
            <div className="flex flex-col gap-5 md:gap-10">
                <div className="w-full max-w-145 flex flex-col gap-3 md:gap-8">
                <h1 className="text-[42px] font-black leading-[0.95] md:text-[64px]">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                <p className="text-[14px] leading-4 text-[darkgray] md:text-[16px]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            </div>
            <div className="w-full">
                <button className="w-full rounded-full bg-black py-3 text-[12px] text-white md:max-w-50 md:py-4 md:text-[18px]">Shop Now</button>
            </div>
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-y-3 text-center md:justify-start md:gap-8 md:text-left">
                <div className="flex w-1/2 flex-col md:w-auto">
                    <h1 className="text-[24px] font-bold md:text-[40px]">200+</h1>
                    <p className="text-[9px] text-[gray] md:text-base">International Brands</p>
                </div>
                <div className="hidden h-18.5 w-px bg-[gray] md:block">
                </div>
                <div className="flex w-1/2 flex-col md:w-auto">
                    <h1 className="text-[24px] font-bold md:text-[40px]">2,000+</h1>
                    <p className="text-[9px] text-[gray] md:text-base">High-Quality Products</p>
                </div>
                <div className="hidden h-18.5 w-px bg-[gray] md:block"></div>
                <div className="flex w-full flex-col md:w-auto">
                    <h1 className="text-[24px] font-bold md:text-[40px]">30,000+</h1>
                    <p className="text-[9px] text-[gray] md:text-base">Happy Customers</p>
                </div>
            </div>
            
            </div>
            <Image
            src="/Vector.svg"
            alt=""
            width={60}
            height={60}
            className="absolute right-[7%] top-[85%] h-10 w-10 animate-star-pulse md:right-[10%] md:top-[10%] md:h-15 md:w-15"
            />

            <Image
            src="/Vector (1).svg"
            alt=""
            width={35}
            height={35}
            className="absolute left-[4%] top-full h-6 w-6 animate-star-pulse md:right-[45%] md:left-auto md:top-1/2 md:h-8.75 md:w-8.75"
            />
       </div>
    </div>
  )
}

export default First
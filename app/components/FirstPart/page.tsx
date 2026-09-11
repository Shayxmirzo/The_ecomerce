import Image from "next/image"

function First() {
  return (
    <div
            className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/Rectangle 2.png')" }}
    >
        <div className="container mx-auto py-28 ">
            <div className="flex flex-col gap-10">
                <div className="max-w-145 w-full flex flex-col gap-8">
                <h1 className="font-black text-[64px]">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                <p className="text-[darkgray] text-[16px]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            </div>
            <div className="">
                <button className="max-w-50 w-full py-4 rounded-full bg-black text-white text-[18px]">Shop Now</button>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex flex-col ">
                    <h1 className="text-[40px] font-bold">200+</h1>
                    <p className="text-[gray]">International Brands</p>
                </div>
                <div className="h-18.5  bg-[gray] w-px">
                </div>
                <div className="flex flex-col ">
                    <h1 className="text-[40px] font-bold">2,000+</h1>
                    <p className="text-[gray]">High-Quality Products</p>
                </div>
                <div className="h-18.5  bg-[gray] w-px"></div>
                <div className="flex flex-col ">
                    <h1 className="text-[40px] font-bold">30,000+</h1>
                    <p className="text-[gray]">Happy Customers</p>
                </div>
            </div>
            
            </div>
            <Image
            src="/Vector.svg"
            alt=""
            width={60}
            height={60}
            className="absolute right-[10%] top-[10%] animate-star-pulse"
            />

            <Image
            src="/Vector (1).svg"
            alt=""
            width={35}
            height={35}
            className="absolute right-[45%] top-1/2 animate-star-pulse"
            />
       </div>
    </div>
  )
}

export default First
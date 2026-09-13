
function DressStyle() {
  return (
    <div className="pt-10 md:pt-20">
        <div className="container mx-auto flex w-full flex-col gap-8 rounded-[40px] bg-[#F0F0F0] p-5 md:gap-16 md:p-14">
        <h1 className="text-center text-3xl font-black md:text-[48px]">BROWSE BY dress STYLE</h1>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 md:min-h-80 md:grid-cols-3">
            <div className="relative h-64 min-h-0 overflow-hidden rounded-[20px] bg-cover bg-center md:col-span-1 md:min-h-80" style={{ backgroundImage: "url('/doesItwork.png')" }}><h1 className="absolute left-8 top-8 text-[28px] font-bold md:text-[36px]">Casual</h1></div>
            <div className="relative h-64 min-h-0 overflow-hidden rounded-[20px] bg-cover bg-center md:col-span-2 md:min-h-80" style={{ backgroundImage: "url('/image 13.png')" }}><h1 className="absolute left-8 top-8 text-[28px] font-bold md:text-[36px]">Formal</h1></div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:min-h-80 md:grid-cols-3">
            <div className="relative h-64 min-h-0 overflow-hidden rounded-[20px] bg-cover bg-center md:col-span-2 md:min-h-80" style={{ backgroundImage: "url('/image 12.png')" }}><h1 className="absolute left-8 top-8 text-[28px] font-bold md:text-[36px]">Party</h1></div>
            <div className="relative h-64 min-h-0 overflow-hidden rounded-[20px] bg-cover bg-center md:col-span-1 md:min-h-80" style={{ backgroundImage: "url('/image 14 (1).png')" }}><h1 className="absolute left-8 top-8 text-[28px] font-bold md:text-[36px]">Gym</h1></div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default DressStyle
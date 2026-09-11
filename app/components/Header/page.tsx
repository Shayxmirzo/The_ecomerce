'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
const img = await import("@/public/Frame (2).svg");
const cartImg = await import("@/public/Frame.svg");
const acctImg = await import("@/public/Frame (1).svg");
function Header() {
  const [SignInhide, setSignInhide] = useState<boolean>(false)
  return (
    <div className="sticky top-0 z-30 w-full">
      <div className={SignInhide ? "hidden": "bg-[black]"}>
        <div className="container relative mx-auto flex justify-center items-center p-2 text-white">
          <p>Sign up and get 20% off to your first order. <span className="underline hover:text-[lightgray]/50"><Link href={""}>Sign Up Now</Link></span></p>
          <span
            onClick={() => setSignInhide(true)}
            aria-label="Close promotion"
            className="absolute right-0 cursor-pointer text-white"
          >
            X
          </span>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <div className="">
            <h1 className="text-[32px]  font-black">SHOP.CO</h1>
          </div>
          <div className="">
            <ul className="flex items-center gap-6 text-[16px]">
              <select name="" id="">
                <option value="">Shop</option>
              </select>
              <li>On sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
          <div className="max-w-145 w-full bg-[#F0F0F0] flex items-center gap-3 p-4 rounded-full">
            <Image src={img} alt=""/>
            <input className="placeholder-[#00000066] text-[#00000066] py-1 w-full" type="text" placeholder="Search for products..." />
          </div>
          <div className="flex items-center gap-4">
            <Image src={cartImg} alt=""/>
            <Image src={acctImg} alt=""/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
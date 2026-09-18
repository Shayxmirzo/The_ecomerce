'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import img from "@/public/Frame (2).svg"
import cartImg from "@/public/Frame.svg"
import acctImg from "@/public/Frame (1).svg"
import searchImg from "@/public/Frame (3).svg"
import { useCartstore } from "@/app/Store/CartStore"

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
    </svg>
  )
}

function Header() {
  const cart = useCartstore((state) => state.cart);
  const [SignInhide, setSignInhide] = useState<boolean>(false)
  return (
    <div className="sticky top-0 z-30 w-full">
      <div className={SignInhide ? "hidden": "bg-[black]"}>
        <div className="text-[10px] md:container md:text-[16px] relative mx-auto flex justify-center items-center p-2 text-white">
          <p>Sign up and get 20% off to your first order. <span className="underline hover:text-[lightgray]/50"><Link href={""}>Sign Up Now</Link></span></p>
          <span
            onClick={() => setSignInhide(true)}
            aria-label="Close promotion"
            className="absolute right-5 cursor-pointer text-white"
          >
            X
          </span>
        </div>
      </div>
      <div className="bg-white">
        <div className=" px-4 py-2 md:container mx-auto md:py-4 flex justify-between items-center">
          <div>
            <h1 className="text-[24px] md:text-[32px]  font-black">SHOP.CO</h1>
          </div>
          <div className="hidden md:flex">
            <ul className="flex items-center gap-6 text-[16px]">
              <select name="" id="">
                <option value="">Shop</option>
              </select>
              <li>On sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
          <div className="hidden md:max-w-145 w-full bg-[#F0F0F0] md:flex items-center gap-3 p-4 rounded-full">
            <Image src={img} alt=""/>
            <input className="placeholder-[#00000066] text-[#00000066] py-1 w-full" type="text" placeholder="Search for products..." />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/Cart" className="relative hidden md:block" aria-label={`Cart, ${cart.length} items`}>
              <Image src={cartImg} alt="" />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-bold text-white">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link href="#profile" className="hidden md:block" aria-label="Profile">
              <Image src={acctImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-black/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur md:hidden" aria-label="Mobile navigation">
        <Link href="/" className="flex min-h-16 items-center justify-center" aria-label="Home">
          <HomeIcon />
        </Link>
        <Link href="#search" className="flex min-h-16 items-center justify-center" aria-label="Search">
          <Image src={searchImg} alt="" className="h-5 w-5" />
        </Link>
        <Link href="/Cart" className="relative flex min-h-16 items-center justify-center" aria-label={`Cart, ${cart.length} items`}>
          <Image src={cartImg} alt="" className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute left-1/2 top-3 flex h-4 min-w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
              {cart.length}
            </span>
          )}
        </Link>
        <Link href="#profile" className="flex min-h-16 items-center justify-center" aria-label="Profile">
          <Image src={acctImg} alt="" className="h-5 w-5" />
        </Link>
      </nav>
    </div>
  )
}

export default Header
'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import img from "@/public/Frame (2).svg"
import cartImg from "@/public/Frame.svg"
import acctImg from "@/public/Frame (1).svg"
import searchImg from "@/public/Frame (3).svg"
import menuImg from "@/public/Frame (4).svg"
function Header() {
  const [SignInhide, setSignInhide] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
          <div className="flex gap-2">
            <button type="button" className="block md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Image src={menuImg} alt="" />
            </button>
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
            <Image src={searchImg} alt=""/>
            <Image src={cartImg} alt=""/>
            <Image src={acctImg} alt=""/>
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 z-40 md:hidden ${menuOpen ? "visible" : "invisible"}`}>
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
        <nav className={`relative h-full w-3/4 max-w-xs bg-white px-6 py-8 shadow-xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black">SHOP.CO</h2>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-2xl">
              ×
            </button>
          </div>
          <ul className="flex flex-col gap-7 text-lg">
            <li><button type="button" onClick={() => setMenuOpen(false)}>Shop</button></li>
            <li><button type="button" onClick={() => setMenuOpen(false)}>On sale</button></li>
            <li><button type="button" onClick={() => setMenuOpen(false)}>New Arrivals</button></li>
            <li><button type="button" onClick={() => setMenuOpen(false)}>Brands</button></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
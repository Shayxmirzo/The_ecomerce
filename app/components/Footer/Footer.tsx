import Image from "next/image"
import imgTwit from "@/public/logo-twitter 2.svg"
import imgFace from "@/public/logo-fb-simple 2.svg"
import imgInsta from "@/public/logo-instagram 1.png"
import imgGit from "@/public/logo-github 1.png"
import Badge from "@/public/Badge.png"
import Badge_1 from "@/public/Badge (1).png"
import Badge_2 from "@/public/Badge (2).png"
import Badge_3 from "@/public/Badge (3).png"
import Badge_4 from "@/public/Badge (4).png"
function Footer() {
  return (
    <footer className="bg-[#F0F0F0] mt-12 px-4 pb-8 pt-0 text-black md:px-8">
      <div className="container mx-auto">
        <div className="relative z-10 -mt-20 flex flex-col items-start justify-between gap-8 rounded-2xl bg-black px-6 py-7 text-white md:flex-row md:items-center md:px-9 md:py-8">
          <h2 className="max-w-xl text-3xl font-black uppercase leading-[0.95] md:text-4xl">
            Stay up to date about
            <br />
            our latest offers
          </h2>
          <form className="flex w-full max-w-sm flex-col gap-3">
            <label className="flex h-10 items-center gap-3 rounded-full bg-white px-4 text-xs text-black/40">
              <span aria-hidden="true">✉</span>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none placeholder:text-black/40"
                aria-label="Email address"
              />
            </label>
            <button type="button" className="h-10 rounded-full bg-white px-4 text-xs font-medium text-black transition-colors hover:bg-[#F0F0F0]">
              Subscribe to Newsletter
            </button>
          </form>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-3 md:gap-14">
          <div>
            <h3 className="text-3xl font-black uppercase">Shop.co</h3>
            <p className="mt-4 max-w-xs text-xs leading-5 text-black/50">
              We have clothes that suits your style and which you are proud to wear. From women to men.
            </p>
            <div className="mt-6 flex gap-2" aria-label="Social media image placeholders">
              <div className="h-7 bg-[white] w-7 flex items-center justify-center rounded-full border border-black/20"><Image src={imgTwit} alt=""/></div>
              <div className="h-7 bg-[black] w-7 flex items-center justify-center rounded-full border border-black/20"><Image src={imgFace} alt=""/></div>
              <div className="h-7 bg-[white] w-7 flex items-center justify-center rounded-full border border-black/20"><Image src={imgInsta} alt=""/></div>
              <div className="h-7 bg-[white] w-7 flex items-center justify-center rounded-full border border-black/20"><Image src={imgGit} alt=""/></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em]">Company</h3>
              <nav className="mt-5 flex flex-col gap-4 text-xs text-black/55">
                <a href="#about" className="hover:text-black">About</a>
                <a href="#features" className="hover:text-black">Features</a>
                <a href="#works" className="hover:text-black">Works</a>
                <a href="#career" className="hover:text-black">Career</a>
              </nav>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em]">Help</h3>
              <nav className="mt-5 flex flex-col gap-4 text-xs text-black/55">
                <a href="#support" className="hover:text-black">Customer Support</a>
                <a href="#delivery" className="hover:text-black">Delivery Details</a>
                <a href="#terms" className="hover:text-black">Terms &amp; Conditions</a>
                <a href="#privacy" className="hover:text-black">Privacy Policy</a>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em]">FAQ</h3>
              <nav className="mt-5 flex flex-col gap-4 text-xs text-black/55">
                <a href="#account" className="hover:text-black">Account</a>
                <a href="#deliveries" className="hover:text-black">Manage Deliveries</a>
                <a href="#orders" className="hover:text-black">Orders</a>
                <a href="#payments" className="hover:text-black">Payments</a>
              </nav>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em]">Resources</h3>
              <nav className="mt-5 flex flex-col gap-4 text-xs text-black/55">
                <a href="#ebooks" className="hover:text-black">Free eBooks</a>
                <a href="#tutorial" className="hover:text-black">Development Tutorial</a>
                <a href="#blog" className="hover:text-black">How to - Blog</a>
                <a href="#playlist" className="hover:text-black">Youtube Playlist</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-black/10 pt-5 text-xs text-black/50 md:flex-row md:items-center md:justify-between">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-2" aria-label="Payment image placeholders">
            <div className="h-7 w-12 flex items-center justify-center rounded border border-black/10 bg-white" ><Image src={Badge} alt=""/></div>
            <div className="h-7 w-12 flex items-center justify-center rounded border border-black/10 bg-white" ><Image src={Badge_1} alt=""/></div>
            <div className="h-7 w-12 flex items-center justify-center rounded border border-black/10 bg-white" ><Image src={Badge_2} alt=""/></div>
            <div className="h-7 w-12 flex items-center justify-center rounded border border-black/10 bg-white" ><Image src={Badge_3} alt=""/></div>
            <div className="h-7 w-12 flex items-center justify-center rounded border border-black/10 bg-white" ><Image src={Badge_4} alt=""/></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
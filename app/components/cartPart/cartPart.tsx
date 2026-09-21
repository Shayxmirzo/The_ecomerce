
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartstore } from "@/app/Store/CartStore";

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
      <path d="M4 7h16M9 7V4h6v3m-9 0 1 13h8l1-13M10 11v5m4-5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
      <path d="m4 5 9-1 7 7-8 8-7-7V5Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartPart() {
  const cart = useCartstore((state) => state.cart);
  const increase = useCartstore((state) => state.increase);
  const decrease = useCartstore((state) => state.decrease);
  const remove = useCartstore((state) => state.deleteFromCart);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const router = useRouter();

  const totalPrice = useCartstore((state) => state.totalPrice());
  const total = promoApplied ? totalPrice * 0.8 : totalPrice;

  function applyPromoCode() {
    setPromoApplied(promoCode.trim().toUpperCase() === "SALE20%");
  }

  return (
    <section className="w-full min-w-0 bg-white px-2 py-4 text-black sm:px-6 sm:py-6  md:px-8 md:py-10">
      <div className="px-2 md:mx-auto w-full max-w-275 min-w-0 ">
        <h1 className="mb-4 text-[24px] font-black uppercase leading-none tracking-[-1.5px] sm:mb-5 sm:text-[36px] md:mb-8 md:text-[40px]">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-[18px] border border-black/10 px-5 py-16 text-center text-black/55">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid min-w-0 items-start gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,1fr)] lg:gap-4">
            <div className="min-w-0 rounded-[18px] border border-black/10 px-2 sm:px-5">
              {cart.map((item, index) => (
                <article key={item.product.id} className={`relative flex min-w-0 gap-2 py-2.5 sm:gap-4 sm:py-4 ${index ? "border-t border-black/10" : ""}`}>
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-[#f0f0f0] sm:h-30 sm:w-30">
                    <Image src={item.product.image} alt={item.product.title} fill sizes="120px" className="object-contain object-center p-2" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 sm:py-1">
                    <div className="pr-6">
                      <h2 className="truncate text-[13px] font-bold sm:text-[18px]">{item.product.title}</h2>
                      <p className="mt-0.5 text-[12px] text-black/55 sm:text-[13px]">Size: <span className="text-black/70">Large</span></p>
                      <p className="text-[12px] text-black/55 sm:text-[13px]">Color: <span className="text-black/70">White</span></p>
                    </div>
                    <p className="text-[18px] font-bold sm:text-[22px]">${(item.product.price * item.qty).toFixed(0)}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-between py-1">
                    <button type="button" onClick={() => remove(item.product.id)} aria-label={`Remove ${item.product.title} from cart`} className="text-[#ff3333] transition-opacity hover:opacity-60">
                      <TrashIcon />
                    </button>
                    <div className="flex h-8 items-center gap-2.5 rounded-full bg-[#f1f1f1] px-3 text-[13px] sm:h-10 sm:gap-4 sm:px-4 sm:text-[15px]">
                      <button type="button" onClick={() => decrease(item.product.id)} aria-label={`Decrease ${item.product.title} quantity`} className="text-[20px] leading-none hover:text-black/50">−</button>
                      <span className="min-w-3 text-center">{item.qty}</span>
                      <button type="button" onClick={() => increase(item.product)} aria-label={`Increase ${item.product.title} quantity`} className="text-[20px] leading-none hover:text-black/50">+</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="min-w-0 rounded-[18px] border border-black/10 p-3 sm:p-5 md:p-6">
              <h2 className="mb-3 text-[18px] font-bold sm:mb-4 sm:text-[22px]">Order Summary</h2>
              <div className="my-4 border-t border-black/10" />
              <div className="flex items-center justify-between"><span className="font-medium text-[16px]">Total</span><strong className="font-medium text-[20px]">${total.toFixed(0)}</strong></div>
              <div className="mt-3 flex w-full min-w-0 gap-2 sm:mt-4">
                <label className="flex h-10 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f1f1f1] px-2.5 text-[10px] text-black/35 sm:h-12 sm:items-center sm:justify-center sm:gap-2 sm:px-4 sm:text-[13px]">
                  <TagIcon />
                  <input aria-label="Promo code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Add promo code" className="h-full min-w-0 w-full flex-1 bg-transparent outline-none placeholder:text-black/35" />
                </label>
                <button type="button" onClick={applyPromoCode} className="shrink-0 rounded-full bg-black px-4 text-[11px] font-medium text-white transition-colors hover:bg-black/75 sm:px-6 sm:text-[13px]">Apply</button>
              </div>
              <button type="button" onClick={() => router.push("/Checkout")} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-black text-[11px] font-medium text-white transition-colors hover:bg-black/75 sm:mt-4 sm:h-12 sm:gap-3 sm:text-[13px]">
                Go to Checkout <ArrowIcon />
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPart;
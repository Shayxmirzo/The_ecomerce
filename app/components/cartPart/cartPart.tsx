
"use client";

import Image from "next/image";
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

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.qty, 0);
  const discount = subtotal * 0.2;
  const delivery = cart.length ? 15 : 0;
  const total = subtotal - discount + delivery;

  return (
    <section className="w-full min-w-0 bg-white px-2 py-4 text-black sm:px-6 sm:py-6 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-275 min-w-0">
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
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[9px] bg-[#f0f0f0] sm:h-[106px] sm:w-[106px]">
                    <Image src={item.product.image} alt={item.product.title} fill sizes="106px" className="object-contain p-2" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 sm:py-1">
                    <div className="pr-6">
                      <h2 className="truncate text-[12px] font-bold sm:text-[16px]">{item.product.title}</h2>
                      <p className="mt-0.5 text-[11px] text-black/55 sm:text-[12px]">Size: <span className="text-black/70">Large</span></p>
                      <p className="text-[11px] text-black/55 sm:text-[12px]">Color: <span className="text-black/70">White</span></p>
                    </div>
                    <p className="text-[16px] font-bold sm:text-[20px]">${(item.product.price * item.qty).toFixed(0)}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-between py-1">
                    <button type="button" onClick={() => remove(item.product.id)} aria-label={`Remove ${item.product.title} from cart`} className="text-[#ff3333] transition-opacity hover:opacity-60">
                      <TrashIcon />
                    </button>
                    <div className="flex h-7 items-center gap-2 rounded-full bg-[#f1f1f1] px-2.5 text-[12px] sm:h-9 sm:gap-4 sm:px-4 sm:text-[14px]">
                      <button type="button" onClick={() => decrease(item.product.id)} aria-label={`Decrease ${item.product.title} quantity`} className="text-[18px] leading-none hover:text-black/50">−</button>
                      <span className="min-w-3 text-center">{item.qty}</span>
                      <button type="button" onClick={() => increase(item.product)} aria-label={`Increase ${item.product.title} quantity`} className="text-[18px] leading-none hover:text-black/50">+</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="min-w-0 rounded-[18px] border border-black/10 p-3 sm:p-5 md:p-6">
              <h2 className="mb-3 text-[18px] font-bold sm:mb-4 sm:text-[22px]">Order Summary</h2>
              <dl className="space-y-2.5 text-[12px] sm:space-y-3 sm:text-[15px]">
                <div className="flex justify-between"><dt className="text-black/50">Subtotal</dt><dd className="font-bold">${subtotal.toFixed(0)}</dd></div>
                <div className="flex justify-between"><dt className="text-black/50">Discount (-20%)</dt><dd className="font-bold text-[#ff3333]">-${discount.toFixed(0)}</dd></div>
                <div className="flex justify-between"><dt className="text-black/50">Delivery Fee</dt><dd className="font-bold">${delivery.toFixed(0)}</dd></div>
              </dl>
              <div className="my-4 border-t border-black/10" />
              <div className="flex items-center justify-between"><span className="text-[14px]">Total</span><strong className="text-[20px]">${total.toFixed(0)}</strong></div>
              <div className="mt-3 flex w-full min-w-0 gap-2 sm:mt-4">
                <label className="flex h-10 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f1f1f1] px-2.5 text-[10px] text-black/35 sm:h-12 sm:gap-2 sm:px-4 sm:text-[13px]">
                  <TagIcon />
                  <input aria-label="Promo code" placeholder="Add promo code" className="h-full min-w-0 w-full flex-1 bg-transparent outline-none placeholder:text-black/35" />
                </label>
                <button type="button" className="shrink-0 rounded-full bg-black px-4 text-[11px] font-medium text-white transition-colors hover:bg-black/75 sm:px-6 sm:text-[13px]">Apply</button>
              </div>
              <button type="button" className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-black text-[11px] font-medium text-white transition-colors hover:bg-black/75 sm:mt-4 sm:h-12 sm:gap-3 sm:text-[13px]">
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
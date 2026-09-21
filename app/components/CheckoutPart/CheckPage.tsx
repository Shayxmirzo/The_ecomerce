
"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCartstore } from "@/app/Store/CartStore";
import { useCheckoutSubmit } from "@/app/hooks/useCheckoutSubmit";

type FormValues = {
  name: string;
  email: string;
  address: string;
};

const initialForm: FormValues = { name: "", email: "", address: "" };

function CheckPage() {
  const cart = useCartstore((state) => state.cart);
  const total = useCartstore((state) => state.totalPrice());
  const { submitCheckout, isSubmitting, error } = useCheckoutSubmit();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await submitCheckout({ customer: form, items: cart, total });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    }
  }

  if (!cart.length) {
    return (
      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-180 rounded-[24px] border border-black/10 px-6 py-16 text-center">
          <p className="mb-5 text-4xl">🛒</p>
          <h1 className="text-2xl font-black uppercase">Your cart is empty</h1>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">Continue shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f7f5] px-4 py-8 text-black sm:px-8 sm:py-12">
      <div className="mx-auto max-w-275">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-black/45">🧾 Secure checkout</p>
            <h1 className="text-[32px] font-black uppercase leading-none tracking-[-1px] sm:text-[48px]">Complete your order</h1>
          </div>
          <Link href="/Cart" className="text-sm font-semibold underline underline-offset-4">← Back to cart</Link>
        </div>

        {submitted ? (
          <div className="rounded-[24px] bg-black px-6 py-16 text-center text-white sm:px-12">
            <p className="mb-4 text-5xl">✅</p>
            <h2 className="text-2xl font-black uppercase">Order sent</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/65">Thanks, {form.name}. Your order details were sent successfully.</p>
            <Link href="/" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
            <form onSubmit={handleSubmit} className="rounded-[24px] bg-white p-5 sm:p-8">
              <h2 className="mb-6 text-xl font-bold">📦 Delivery details</h2>
              <div className="grid gap-5">
                <label className="grid gap-2 text-sm font-semibold">Full name
                  <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-13 rounded-[12px] border border-black/12 px-4 font-normal outline-none transition focus:border-black" placeholder="Your full name" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">Email address
                  <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-13 rounded-[12px] border border-black/12 px-4 font-normal outline-none transition focus:border-black" placeholder="you@example.com" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">Delivery address
                  <textarea required rows={4} value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="resize-y rounded-[12px] border border-black/12 px-4 py-3 font-normal outline-none transition focus:border-black" placeholder="Street, city, postal code" />
                </label>
              </div>
              {error && <p role="alert" className="mt-5 rounded-[12px] bg-red-50 px-4 py-3 text-sm text-red-700">⚠️ {error}</p>}
              <button disabled={isSubmitting} className="mt-7 flex h-13 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition hover:bg-black/75 disabled:cursor-wait disabled:opacity-50">
                {isSubmitting ? "Sending order..." : "Place order 🚀"}
              </button>
            </form>

            <aside className="rounded-[24px] bg-white p-5 sm:p-8">
              <h2 className="mb-5 text-xl font-bold">🛍️ Your items</h2>
              <div className="grid gap-4">
                {cart.map(({ product, qty }) => (
                  <article key={product.id} className="flex gap-3 border-b border-black/8 pb-4">
                    <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-[12px] bg-[#f0f0f0]">
                      <Image src={product.image} alt={product.title} fill sizes="72px" className="object-contain p-2" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold">{product.title}</h3>
                      <p className="mt-1 text-xs text-black/55">🔢 {qty} × ${product.price.toFixed(2)} · ⭐ {product.rating.rate}/5</p>
                      <p className="mt-1 line-clamp-2 text-xs text-black/45">📝 {product.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default CheckPage
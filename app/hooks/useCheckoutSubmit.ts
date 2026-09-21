"use client";

import { useState } from "react";
import type { CartItem } from "@/app/Store/CartStore";

export type CheckoutPayload = {
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: CartItem[];
  total: number;
};

type CheckoutResponse = {
  message?: string;
};

export function useCheckoutSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitCheckout(payload: CheckoutPayload) {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as CheckoutResponse;

      if (!response.ok) {
        throw new Error(result.message || "Could not send your order.");
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Could not send your order.";
      setError(message);
      throw submitError;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitCheckout, isSubmitting, error };
}
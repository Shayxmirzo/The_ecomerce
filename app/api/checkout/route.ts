import type { CartItem } from "@/app/Store/CartStore";

type CheckoutRequest = {
  customer?: {
    name?: unknown;
    email?: unknown;
    address?: unknown;
  };
  items?: unknown;
  total?: unknown;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return Boolean(item.product && typeof item.qty === "number" && item.qty > 0);
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_CHAT_ID;

  if (!botToken || !chatId) {
    return Response.json({ message: "Telegram is not configured on the server." }, { status: 500 });
  }

  let body: CheckoutRequest;
  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return Response.json({ message: "Invalid checkout data." }, { status: 400 });
  }

  const name = typeof body.customer?.name === "string" ? body.customer.name.trim() : "";
  const email = typeof body.customer?.email === "string" ? body.customer.email.trim() : "";
  const address = typeof body.customer?.address === "string" ? body.customer.address.trim() : "";
  const items = Array.isArray(body.items) ? body.items.filter(isCartItem) : [];
  const total = typeof body.total === "number" && Number.isFinite(body.total) ? body.total : 0;

  if (!name || !email || !address || !items.length) {
    return Response.json({ message: "Please complete your contact details and cart." }, { status: 400 });
  }

  const itemLines = items.map(({ product, qty }) => [
    `🛒 <b>${escapeHtml(product.title)}</b>`,
    `   🔢 Qty: ${qty} x $${product.price.toFixed(2)} = $${(product.price * qty).toFixed(2)}`,
    `   🪙 Price: $${product.price.toFixed(2)}`,
    `    💰 Total price: $${(product.price * qty).toFixed(2)}`,
    `   ⭐ Rating: ${product.rating.rate}/5`,
    `   📝 ${escapeHtml(product.description).slice(0, 300)}`,
  ].join("\n"));

  const message = [
    "🛍️ <b>New checkout order</b>",
    "",
    `👤 <b>Name:</b> ${escapeHtml(name)}`,
    `📧 <b>Email:</b> ${escapeHtml(email)}`,
    `📍 <b>Address:</b> ${escapeHtml(address)}`,
    "",
    ...itemLines,
    "",
    `💳 <b>Total:</b> $${total.toFixed(2)}`,
  ].join("\n").slice(0, 4000);

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });

    if (!telegramResponse.ok) {
      return Response.json({ message: "Telegram could not receive the order." }, { status: 502 });
    }

    return Response.json({ message: "Order sent successfully." });
  } catch {
    return Response.json({ message: "Could not connect to Telegram." }, { status: 502 });
  }
}
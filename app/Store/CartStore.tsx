import { create } from "zustand";
import { ProductTypes } from "../Types/ProductTypes";
import { persist } from "zustand/middleware";

export interface CartItem{
    product: ProductTypes;
    qty: number;
};
interface CartState{
    cart: CartItem[];

    addToCart: (product: ProductTypes) => void;
    increase: (product: ProductTypes) => void;
    decrease: (product: number) => void;
    deleteFromCart: (productId: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
};
export const useCartstore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const existing = get().cart.find((el) => el.product.id === product.id);
                if(existing){
                    set({
                        cart: get().cart.map((el) => 
                            el.product.id === product.id ? {...el, qty: el.qty + 1}
                        :
                        el
                    ),
                    });
                } else{
                    set({cart: [... get().cart, { product, qty: 1}]})
                }
            },
            increase: (product) => set((state) => ({
                cart: state.cart.map((el) => el.product.id === product.id ? {...el, qty: el.qty + 1} : el)
            })),
            decrease: (productId) => set((state) => ({
                cart: state.cart.map((el) => el.product.id === productId ? {...el, qty: el.qty - 1} : el).filter((el) => el.qty > 0)
            })),
            deleteFromCart: (productId) => set((state) => ({
                cart: state.cart.filter((item) => item.product.id !== productId)
            })),
            clearCart: () => set({cart: []}),
            totalPrice: () => get().cart.reduce((acc, item) => acc + item.product.price * item.qty, 0),
        }),
        {
            name: "cart-storage",
        }
    )
)
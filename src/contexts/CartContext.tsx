"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some((prevProduct) => prevProduct.id === product.id);

    if (productIsAlreadyOnTheCart) {
        return setProducts((prevState) => {
            return prevState.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity
                    }
                }

                return prevProduct;
            });
        });
    }

    setProducts((prevState) => [...prevState, product]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

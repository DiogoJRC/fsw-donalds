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
  total: number;
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  totalQuantity: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    if (productIsAlreadyOnTheCart) {
      return setProducts((prevState) => {
        return prevState.map((prevProduct) => {
          if (prevProduct.id === product.id) {
            return {
              ...prevProduct,
              quantity: prevProduct.quantity + product.quantity,
            };
          }

          return prevProduct;
        });
      });
    }

    setProducts((prevState) => [...prevState, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevState) => {
      return prevState.map((product) => {
        if (product.id !== productId || product.quantity === 1) {
          return product;
        }

        return { ...product, quantity: product.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevState) => {
      return prevState.map((product) => {
        if (product.id !== productId || product.quantity >= 99) {
          return product;
        }

        return { ...product, quantity: product.quantity + 1 };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevState) =>
      prevState.filter((product) => product.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        total,
        totalQuantity,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

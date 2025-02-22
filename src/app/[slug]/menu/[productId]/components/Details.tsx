"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "@/contexts/CartContext";
import { formatCurrency } from "@/helpers/formatCurrency";

import Cart from "../../components/Cart";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { toggleCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }

      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev >= 99) {
        return 99;
      }

      return prev + 1;
    });
  };

  const handleAddToCart = () => {
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-5">
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-slate-400">{product.restaurant.name}</p>
        </div>

        <h2 className="mt-1 font-semibold">{product.name}</h2>

        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>

          <div className="flex items-center gap-2 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl transition-all duration-200 ease-linear"
              onClick={handleDecreaseQuantity}
              disabled={quantity === 1}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="w-5">{quantity}</p>

            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl transition-all duration-200 ease-linear"
              onClick={handleIncreaseQuantity}
              disabled={quantity >= 99}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="my-3 flex-auto overflow-hidden">
          <ScrollArea className="h-full flex-shrink-0 flex-grow">
            <div className="my-3">
              <div className="space-y-2">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="5 flex items-center gap-1.5">
                  <ChefHatIcon size={18} />
                  <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <ul className="text-muted-fo list-disc px-5 text-sm text-muted-foreground marker:text-xs">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>

        <Button
          className="w-full flex-shrink-0 rounded-full"
          size="lg"
          onClick={handleAddToCart}
        >
          Adicionar à sacola
        </Button>
      </div>

      <Cart />
    </>
  );
};

export default ProductDetails;

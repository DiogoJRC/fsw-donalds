import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CartProduct } from "@/contexts/CartContext";
import { formatCurrency } from "@/helpers/formatCurrency";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between gap-3 border-t pt-5 first:border-t-0 first:pt-0">
      <div className="relative h-20 w-20 rounded-xl bg-gray-100">
        <Image src={product.imageUrl} alt={product.name} fill />
      </div>

      <div className="flex items-center space-y-0.5">
        <div className="max-w-40">
          <p className="truncate text-ellipsis text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          <div className="mt-1 flex items-center gap-1 text-center">
            <Button
              className="h-8 w-8 rounded-xl transition-all duration-200 ease-linear"
              variant="outline"
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              className="h-8 w-8 rounded-xl transition-all duration-200 ease-linear"
              variant="destructive"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button className="h-8 w-8 rounded-xl" variant="outline">
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default CartItem;

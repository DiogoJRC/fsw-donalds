import { Trash2Icon } from "lucide-react";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { CartContext, CartProduct } from "@/contexts/CartContext";
import { formatCurrency } from "@/helpers/formatCurrency";

import ProductQuantityInput from "../../components/ProductQuantityInput";
import ProductThumbnail from "../../components/ProductThumbnail";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);

  return (
    <div className="flex items-center justify-between gap-3 border-t pt-5 first:border-t-0 first:pt-0">
      <div className="flex gap-3">
        <ProductThumbnail src={product.imageUrl} alt={product.name} size={20} />

        <div className="flex items-center space-y-0.5">
          <div className="max-w-40">
            <p className="truncate text-ellipsis text-xs">{product.name}</p>
            <p className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>

            <div className="mt-1">
              <ProductQuantityInput
                quantity={product.quantity}
                onDecrease={() => decreaseProductQuantity(product.id)}
                onIncrease={() => increaseProductQuantity(product.id)}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        className="h-8 w-8 rounded-xl"
        variant="outline"
        onClick={() => removeProduct(product.id)}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default CartItem;

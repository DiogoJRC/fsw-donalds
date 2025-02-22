import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContext } from "@/contexts/CartContext";

import CartItem from "./CartItem";

const Cart = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%] pt-8">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 py-7">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

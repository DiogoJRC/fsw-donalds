import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContext } from "@/contexts/CartContext";
import { formatCurrency } from "@/helpers/formatCurrency";

import CartItem from "./CartItem";

const Cart = () => {
  const {
    isOpen,
    products,
    total: subtotal,
    toggleCart,
  } = useContext(CartContext);

  const descontos = 0;
  const total = subtotal - descontos;

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%] pt-8">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col gap-6 py-7">
          <div className="-mx-5 flex-auto overflow-hidden">
            <ScrollArea className="h-full px-5">
              <div className="flex flex-col gap-5">
                {products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-5">
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Subotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <hr />
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Descontos</p>
              <p>{formatCurrency(descontos)}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>{formatCurrency(total)}</p>
            </div>
          </div>

          <Button className="w-full rounded-full" size="lg">
            Finalizar pedido
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatCurrency";

interface OrdersListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            slug: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento confirmado";
  if (status === "PAYMENT_FAILED") return "Pagamento falhou";
  return "";
};

const OrdersList = ({ orders }: OrdersListProps) => {
  const router = useRouter();

  const restaurantSlug = orders[0].restaurant.slug;

  const handleBackClick = () => router.replace(`/${restaurantSlug}`);

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-5"
        >
          <div
            className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${
              (
                [
                  OrderStatus.PAYMENT_CONFIRMED,
                  OrderStatus.FINISHED,
                ] as OrderStatus[]
              ).includes(order.status)
                ? "bg-green-500 text-white"
                : order.status === OrderStatus.IN_PREPARATION
                  ? "bg-gray-50 text-primary"
                  : "bg-gray-50 text-gray-400"
            } `}
          >
            {getStatusLabel(order.status)}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image
                src={order.restaurant.avatarImageUrl}
                alt={order.restaurant.name}
                className="rounded-sm"
                fill
              />
            </div>
            <p className="text-sm font-semibold">{order.restaurant.name}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            {order.orderProducts.map((orderProduct) => (
              <div key={orderProduct.id} className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                  {orderProduct.quantity}
                </div>
                <p className="text-sm">{orderProduct.product.name}</p>
              </div>
            ))}
          </div>

          <Separator />

          <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;

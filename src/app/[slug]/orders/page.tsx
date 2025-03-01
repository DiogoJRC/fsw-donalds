import { isValidCPF } from "@/helpers/isValidCPF";
import { removeCPFPunctuation } from "@/helpers/removeCPFPunctuation";
import { db } from "@/lib/prisma";

import CPFForm from "./components/CPFForm";
import OrdersList from "./components/OrdersList";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CPFForm />;
  } else if (!isValidCPF(cpf)) {
    return <CPFForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCPFPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          slug: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrdersList orders={orders} />;
};

export default OrdersPage;

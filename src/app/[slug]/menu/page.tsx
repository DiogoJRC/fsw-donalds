import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import Categories from "./components/Categories";
import Header from "./components/Header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });

  if (!(isConsumptionMethodValid(consumptionMethod) && restaurant)) {
    return notFound();
  }

  return (
    <div>
      <Header restaurant={restaurant} />
      <Categories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;

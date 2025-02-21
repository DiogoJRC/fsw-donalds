"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./Products";

interface CategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const Categories = ({ restaurant }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "outline";
  };

  return (
    <div className="relative z-50 mt-[-3rem] rounded-t-3xl bg-white">
      <div className="border-b border-black/10 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              className="overflow-hidden rounded-lg"
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              height={45}
              width={45}
            />

            <div>
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-2xl border border-black/10 px-2.5 py-1.5 text-xs font-medium">
            <StarIcon fill="#fbb100" strokeWidth={0} size={14} />
            5.0
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
          <ClockIcon size={14} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-3 p-5 pb-4">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className={`rounded-full px-4 py-2 ${selectedCategory.id === category.id ? "font-semibold" : "font-normal text-gray-500"}`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />
    </div>
  );
};

export default Categories;

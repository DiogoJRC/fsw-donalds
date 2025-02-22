"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const Header = ({ restaurant }: HeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-5 top-6 z-50 rounded-full [&_svg]:size-5"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-5 top-6 z-50 rounded-full [&_svg]:size-5"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default Header;

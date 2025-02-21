"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const Header = ({ restaurant }: HeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
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
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default Header;

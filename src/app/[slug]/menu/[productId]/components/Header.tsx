"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="relative min-h-[300px] w-full bg-black/10">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-5 top-6 z-50 rounded-full [&_svg]:size-5"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        priority={true}
        className="object-contain"
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

export default ProductHeader;

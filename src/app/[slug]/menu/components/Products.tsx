import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="space-y-3 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href="/"
          className="flex items-center justify-between gap-10 border-b px-5 py-3"
        >
          <div className="text-sm">
            <h3>{product.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-muted-foreground">
              {product.description}
            </p>
            <p className="text-md mt-3 font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>

          <div className="relative min-h-[82px] min-w-[82px] rounded-lg bg-black/5">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain p-1"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;

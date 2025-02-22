import { Product } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

import { formatCurrency } from "@/helpers/formatCurrency";

import ProductThumbnail from "../../components/ProductThumbnail";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="space-y-3 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 border-b px-5 py-3"
        >
          <div className="text-sm">
            <h3>{product.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-muted-foreground">
              {product.description}
            </p>
            <p className="text-md mt-3 font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          <ProductThumbnail
            src={product.imageUrl}
            alt={product.name}
            size={20}
          />
        </Link>
      ))}
    </div>
  );
};

export default Products;

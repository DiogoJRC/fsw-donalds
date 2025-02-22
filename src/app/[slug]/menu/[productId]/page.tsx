import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/Header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const product = await db.product.findUnique({ where: { id: productId } });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={product} />
      <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white p-5"></div>
    </>
  );
};

export default ProductPage;

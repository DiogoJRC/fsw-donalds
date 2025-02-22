import Image from "next/image";

interface ProductThumbnailProps {
  src: string;
  alt: string;
}

const ProductThumbnail = ({ src, alt }: ProductThumbnailProps) => {
  return (
    <div className={`relative size-20 flex-shrink-0 rounded-lg bg-black/5`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${20 * 4}px`}
        className="object-contain p-1"
      />
    </div>
  );
};

export default ProductThumbnail;

import Image from "next/image";

interface ProductThumbnailProps {
  src: string;
  alt: string;
  size: number;
}

const ProductThumbnail = ({ src, alt, size }: ProductThumbnailProps) => {
  const sizeClass = `size-${size}`;

  return (
    <div
      className={`relative ${sizeClass} flex-shrink-0 rounded-lg bg-black/5`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size * 4}px`}
        className="object-contain p-1"
      />
    </div>
  );
};

export default ProductThumbnail;

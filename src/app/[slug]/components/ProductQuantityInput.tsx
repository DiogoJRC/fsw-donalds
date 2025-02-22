import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProductQuantityInputProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const ProductQuantityInput = ({
  quantity,
  onDecrease,
  onIncrease,
}: ProductQuantityInputProps) => {
  return (
    <div className="flex items-center gap-1 text-center">
      <Button
        variant="outline"
        className="h-8 w-8 rounded-xl transition-all duration-200 ease-linear"
        onClick={onDecrease}
        disabled={quantity === 1}
      >
        <ChevronLeftIcon />
      </Button>

      <p className="w-7 text-sm">{quantity}</p>

      <Button
        variant="destructive"
        className="h-8 w-8 rounded-xl transition-all duration-200 ease-linear"
        onClick={onIncrease}
        disabled={quantity >= 99}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default ProductQuantityInput;

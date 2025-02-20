import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  imageAlt,
  imageUrl,
  buttonText,
  option,
}: ConsumptionMethodOptionProps) => {
  return (
    <Link
      href={`/${slug}/menu?consumptionMethod=${option}`}
      className="flex flex-col items-center gap-8 rounded-xl border border-gray-100 px-3 pb-3 pt-8"
    >
      <div className="relative h-[80px] w-[80px]">
        <Image src={imageUrl} fill alt={imageAlt} className="object-contain" />
      </div>
      <Button
        variant="secondary"
        className="w-full rounded-full font-semibold"
        asChild
      >
        <span>{buttonText}</span>
      </Button>
    </Link>
  );
};

export default ConsumptionMethodOption;

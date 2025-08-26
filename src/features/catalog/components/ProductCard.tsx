import { Product, ProductImage } from '@/generated/prisma';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatToBRL } from '@/helpers/format-to-brl';

interface IProductCardProps {
  product: Product & { images: Omit<ProductImage, 'productId'>[] };
}

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <div className="flex flex-col  justify-center gap-6">
      <div className="relative w-[256px] h-[356px] overflow-hidden flex flex-col items-center justify-center gap-6">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover rounded-xs"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium">{product.name}</h3>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="w-fit">
            {product.balance > 0 ? 'Disponível' : 'Esgotado'}
          </Badge>
          <div className="flex items-center gap-2">
            <p className={`text-sm text-neutral-600 ${product.specialPrice ? 'line-through' : ''}`}>
              {formatToBRL(Number(product.basePrice))}
            </p>
            {product.specialPrice && (
              <p className="text-sm text-primary font-medium">{formatToBRL(Number(product.specialPrice))}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

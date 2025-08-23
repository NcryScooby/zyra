import { Product, ProductImage } from '@/generated/prisma';
import ProductCard from '../product-card/page';

interface IShowcaseProps {
  showcaseHeader: React.ReactNode;
  products: (Product & { images: Omit<ProductImage, 'productId'>[] })[];
}

export default function Showcase({ showcaseHeader, products }: IShowcaseProps) {
  return (
    <div className="flex flex-col gap-20 items-center justify-center max-w-7xl mx-auto">
      {showcaseHeader}
      <div className="grid grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

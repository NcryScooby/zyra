import Banner from '@/features/marketing/components/Banner';
import FeatureCard from '@/features/marketing/components/FeatureCard';
import Header from '@/features/layout/components/Header';
import Showcase from '@/features/catalog/components/Showcase';
import { productRepository } from '@/server/modules/products/product.repository';
import { AwardIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';

export default async function Home() {
  const products = await productRepository.findMany({
    include: {
      images: {
        select: {
          id: true,
          url: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  });

  return (
    <>
      <Header />
      <Banner
        title="Confira os novos produtos"
        description="Descubra nossa mais nova coleção hoje mesmo."
        image="/banner-image.png"
        action={{
          text: 'Ver coleção completa',
          href: '/produtos',
        }}
      />
      <div className="flex justify-center max-w-7xl mx-auto p-20 gap-24">
        <FeatureCard
          icon={<TruckIcon className="w-6 h-6" strokeWidth={1.5} />}
          title="Frete grátis"
          description="Frete grátis para compras acima de R$ 100,00."
        />
        <FeatureCard
          icon={<AwardIcon className="w-6 h-6" strokeWidth={1.5} />}
          title="Garantia de qualidade"
          description="Todos os produtos são testados e aprovados pela nossa equipe."
        />
        <FeatureCard
          icon={<ShieldCheckIcon className="w-6 h-6" strokeWidth={1.5} />}
          title="Compra segura"
          description="Compra segura com pagamento seguro e garantia de qualidade."
        />
      </div>
      <div className="py-20">
        <Showcase
          showcaseHeader={
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-600 uppercase">Compre agora</p>
              <h2 className="text-2xl font-bold">Mais vendidos</h2>
            </div>
          }
          products={products}
        />
      </div>
      <Banner
        title="Explore nosso paraíso da moda!"
        description="Entre em um mundo de estilo e explore nossa coleção diversificada de categorias de roupas."
        image="/banner-image-2.png"
        action={{
          text: 'Comece a navegar',
          href: '/produtos',
        }}
        className="bg-gradient-to-r from-accent to-accent/0"
      />
      <div className="py-20">
        <Showcase
          showcaseHeader={
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-600 uppercase">Compre agora</p>
              <h2 className="text-2xl font-bold">Mais vendidos</h2>
            </div>
          }
          products={products}
        />
      </div>
    </>
  );
}

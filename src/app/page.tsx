import Banner from '@/components/banner/page';
import FeatureCard from '@/components/feature-card/page';
import Header from '@/components/header/page';
import { AwardIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';

export default function Home() {
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
    </>
  );
}

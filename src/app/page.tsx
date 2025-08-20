import Banner from "@/components/banner/page";
import Header from "@/components/header/page";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner
        title="Confira os novos produtos"
        description="Descubra nossa mais nova coleção hoje mesmo."
        image="/banner-image.png"
        action={{
          text: "Ver coleção completa",
          href: "/produtos",
        }}
      />
    </div>
  );
}

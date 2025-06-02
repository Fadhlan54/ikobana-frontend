import SectionTitle from "@/components/elements/common/SectionTitle";
import ProductCard from "@/components/elements/ProductCard";

export default function FeaturedProduct() {
  return (
    <section id="featured-product">
      <SectionTitle title="Produk Unggulan" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-8">
        <ProductCard
          name="Dumpling Ayam"
          desc="Isian ayam gurih dengan kulit lembut"
          weight={900}
          stock={10}
          price={20000}
        />
        <ProductCard
          name="Dumpling Ayam"
          desc="Isian ayam gurih dengan kulit lembut"
          weight={900}
          stock={10}
          price={20000}
        />
        <ProductCard
          name="Dumpling Ayam"
          desc="Isian ayam gurih dengan kulit lembut"
          weight={900}
          stock={10}
          price={20000}
        />
        <ProductCard
          name="Dumpling Ayam"
          desc="Isian ayam gurih dengan kulit lembut"
          weight={900}
          stock={10}
          price={20000}
        />
      </div>
    </section>
  );
}

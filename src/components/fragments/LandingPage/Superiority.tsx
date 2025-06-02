import SectionTitle from "@/components/elements/common/SectionTitle";

export default function Superiority() {
  return (
    <section className="px-4 lg:px-8">
      <SectionTitle title="Keunggulan" />
      <div className="grid grid-cols-2 md:grid-cols-4">
        <Item
          title="Bahan Premium"
          desc="Diproduksi dengan bahan segar & alami"
        />
        <Item title="Praktis Dimasak" desc="Siap saji dalam hitungan menit" />
        <Item
          title="Pengiriman Gratis"
          desc="Untuk Kecamatan Gunung Putri & Jatiasih"
        />
        <Item
          title="Harga Terjangkau"
          desc="Kualitas terjamin tanpa khawatir kantong kering"
        />
      </div>
    </section>
  );
}

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="px-4 py-6">
      <h4 className="font-semibold text-xl text-center mb-2">{title}</h4>
      <p className="text-center text-neutral-6">{desc}</p>
    </div>
  );
}

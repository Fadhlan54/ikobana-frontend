import Button from "@/components/elements/Button";

export default function Hero() {
  return (
    <section className="h-[calc(100svh-70px)] flex items-center justify-center flex-col bg-neutral-3 text-center">
      <h2 className="font-bold text-5xl mb-4 text-primary-1 text-shadow-lg">
        Lezat, Praktis, dan Terjangkau
      </h2>
      <h4 className="font-semibold text-2xl mb-8 text-white text-shadow-lg">
        Nikmati Frozen Food Berkualitas Tinggi dari{" "}
        <span className="text-primary-1">Ikobana Frozen Food</span>
      </h4>
      <p className="text-lg mb-6 text-white text-shadow-lg">
        Menjual bahan pilihan, diproses higienis, dan siap memudahkan masakan
        sehari-harimu!
      </p>

      <Button variant="primary" size="lg" handleClick={() => {}}>
        Lihat Produk
      </Button>
    </section>
  );
}

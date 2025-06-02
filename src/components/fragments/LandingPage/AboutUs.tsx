export default function AboutUs() {
  return (
    <section
      className="px-4 lg:px-8 flex items-center gap-6 shrink-0 flex-wrap lg:flex-nowrap "
      id="about-us"
    >
      <div className="w-full lg:w-1/2 space-y-4">
        <h2 className="text-[28px] font-bold">Tentang Kami</h2>
        <p>
          Ikobana Frozen Food hadir untuk memberikan solusi praktis bagi
          keluarga. Kami berkomitmen menyajikan frozen food dengan cita rasa
          tinggi, tanpa pengawet berbahaya, dan proses produksi yang terjaga
          kebersihannya.
        </p>
        <p>
          Dengan pengalaman lebih dari 5 tahun di industri makanan beku, kami
          memahami betul bagaimana menghasilkan produk yang tidak hanya enak
          tetapi juga aman dan bergizi untuk keluarga Anda.
        </p>

        <div className="bg-primary-1 rounded-lg text-white p-4">
          <h5 className="font-semibold">Alamat</h5>
          <p>
            Blok Z6 No 14, Villa Nusa Indah 2, Kelurahan Bojong Kulur, Kecamatan
            Gunung Putri, Kabupaten Bogor, Jawa Barat, 16969
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <GoogleMapEmbed />
      </div>
    </section>
  );
}

const GoogleMapEmbed: React.FC = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.542912143091!2d106.97366197355578!3d-6.3236057618747825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699245e9ca2e9f%3A0x148233c0784067e5!2sToko%20Ikobana!5e0!3m2!1sid!2sid!4v1746098929638!5m2!1sid!2sid"
      width="100%"
      height="420"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-lg"
    ></iframe>
  );
};

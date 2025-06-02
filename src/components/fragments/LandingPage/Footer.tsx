import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-8 text-white" id="contact">
      <div className="flex flex-wrap  gap-8 justify-between py-12 px-4 lg:px-8">
        <div className="flex flex-col justify-between">
          <Image
            src="/images/Logo Ikobana Dark.png"
            alt="Logo Ikobana"
            width={130}
            height={60}
          />

          <div className="text-sm mt-4">
            <p>+62 812 8431 1136</p>
            <p>ikobanafrozenfood@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-wrap  gap-8 text-sm">
          <div>
            <h3 className="text-xl font-semibold mb-2">Tautan Cepat</h3>
            <ul className="space-y-2">
              <LinkItem href="/" text="Beranda" />
              <LinkItem href="#featured-product" text="Produk Unggulan" />
              <LinkItem href="#about-us" text="Tentang Kami" />
              <LinkItem href="#contact" text="Kontak" />
            </ul>
          </div>
          <div className="w-64 space-y-2">
            <h3 className="text-xl font-semibold">Layanan</h3>
            <p>Senin - Minggu (08.00 - 19.00 WIB)</p>
            <p>Pengiriman gratis (Kecamatan Gunung Putri & Jatiasih)</p>
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
}

function LinkItem({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="hover:underline hover:text-neutral-2 focus:text-neutral-3"
      >
        {text}
      </Link>
    </li>
  );
}

function Copyright() {
  return (
    <div className="text-sm px-4 lg:px-8 py-4 border-t border-neutral-4 text-center">
      <p>© 2025 Ikobana Frozen Food. All Rights Reserved.</p>
    </div>
  );
}

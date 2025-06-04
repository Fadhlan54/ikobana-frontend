import Button from "@/components/elements/Button";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";

export default function Submitted() {
  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <div className="mx-auto w-fit h-fit p-4  rounded-full bg-primary-1/10">
            <FaRegEnvelope size={40} className="text-primary-1" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            Email Terkirim
          </h2>
          <p className="mt-2 text-gray-600">
            Kami telah mengirimkan instruksi untuk mereset kata sandi Anda ke
            email Anda.
          </p>
        </div>
        <Link href="/" passHref className="mx-auto block">
          <Button
            variant="primary"
            className="text-base text-center font-medium mx-auto"
          >
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}

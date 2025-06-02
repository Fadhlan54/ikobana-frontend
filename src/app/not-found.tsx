"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Button from "@/components/elements/Button";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
  }
);
const MotionH1 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h1),
  {
    ssr: false,
  }
);
const MotionH2 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h2),
  {
    ssr: false,
  }
);
const MotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  {
    ssr: false,
  }
);

export default function PageNotFound() {
  return (
    <div className="min-h-[calc(100svh-70px)] bg-gradient-to-br from-primary-50 to-white flex flex-col items-center justify-center p-6 text-center">
      <MotionDiv
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="space-y-4">
          <MotionH1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-primary-600"
          >
            404
          </MotionH1>

          <MotionH2
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-semibold text-gray-800"
          >
            Halaman Tidak Ditemukan
          </MotionH2>

          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 max-w-md mx-auto"
          >
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <Link href="/" passHref className="mx-auto block">
              <Button
                variant="primary"
                className="text-base font-medium mx-auto"
              >
                Kembali ke Beranda
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  );
}

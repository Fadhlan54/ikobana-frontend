"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export default function Pagination({ totalPage }: { totalPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "", 10) || 1;

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(pathname + "?" + params.toString());
  }

  const getPaginationButtons = () => {
    const buttons = [];
    const delta = 2;
    let startPage = 1;
    let endPage = totalPage;

    if (totalPage <= 5) {
      startPage = 1;
      endPage = totalPage;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = Math.min(5, totalPage);
      } else if (page >= totalPage - 2) {
        startPage = Math.max(totalPage - 4, 1);
        endPage = totalPage;
      } else {
        startPage = page - delta;
        endPage = page + delta;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={`page-${i}`}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(i);
          }}
          className={`flex h-6 w-6 items-center justify-center rounded cursor-pointer ${
            page === i ? "bg-primary-1 text-white" : "text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button>
        <FiChevronsLeft size={20} />
      </button>
      <button>
        <FiChevronLeft size={20} />
      </button>
      {getPaginationButtons()}
      <button>
        <FiChevronRight size={20} />
      </button>
      <button>
        <FiChevronsRight size={20} />
      </button>
    </div>
  );
}

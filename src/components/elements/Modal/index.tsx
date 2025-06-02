"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

export default function Modal({
  children,
  title,
  onClose,
  width = "520px",
  showHeader = true,
}: {
  showHeader?: boolean;
  children: React.ReactNode;
  title: string;
  width?: string;
  onClose?: () => void;
}) {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    dispatch(setShowModal(null));
  }, [dispatch, onClose]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white w-full  rounded"
        ref={modalRef}
        style={{ width: width, maxWidth: "90%" }}
      >
        {showHeader && (
          <div
            className={`px-4 lg:px-8 py-4 flex border-b border-neutral-4 items-center ${
              title ? "justify-between" : "justify-end"
            }`}
          >
            {title && (
              <h3 className="font-bold text-primary-1 text-2xl">{title}</h3>
            )}
            <button
              className="flex items-center justify-center p-1  rounded-full hover:text-alert-danger text-neutral-5 bg-neutral-200"
              onClick={handleClose}
            >
              <MdClose size={20} />
            </button>
          </div>
        )}
        <div className="px-4 lg:px-8 py-4 max-h-[calc(80vh)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

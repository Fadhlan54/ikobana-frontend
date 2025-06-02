"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetUser, selectUser, setUser } from "@/redux/slices/user";
import { getUserProfile } from "@/service/user.service";
import { deleteCookie } from "@/utils/cookies";
import { Address, AddressResponse } from "@/interface/address";
import Avatar from "../elements/Avatar";
import { Tooltip } from "react-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function NavbarAdminComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const at = Cookies.get("at");
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const pathName = usePathname();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: getUserProfile,
    onSuccess: (data) => {
      const userData = data.result;
      const userAddresses: Address[] = userData.addresses.map(
        (address: AddressResponse) => ({
          id: address.id,
          label: address.label,
          city: address.city,
          district: address.district,
          subDistrict: address.sub_district,
          street: address.street,
          postalCode: address.postal_code,
        })
      );
      dispatch(
        setUser({
          id: userData.id,
          name: userData.fullname,
          email: userData.email,
          phone: userData.phone_number,
          addresses: userAddresses,
          role: userData.role,
        })
      );
    },
    onError: () => {
      dispatch(resetUser());
      deleteCookie("at");
      deleteCookie("rt");
    },
  });

  useEffect(() => {
    if (!user.id && at) {
      mutate();
    }
  }, [mutate, user.id, at]);

  useEffect(() => {
    if (message === "unauthorized") {
      toast.error("Silakan login terlebih dahulu");
      router.push(pathName);
    }
  }, [message, pathName, router, searchParams]);

  useEffect(() => {
    if (!at && pathName !== "/admin/login") {
      toast.error("Anda belum login");
      router.push("/admin/login");
    } else if (at && user.role && user.role !== "admin") {
      toast.error("Anda bukan admin");
      router.push("/");
    }
  }, [at, router, pathName, user]);

  return (
    <header className="sticky top-0 z-30 h-[70px] bg-white shadow-md">
      <nav className="mx-auto flex h-full items-center justify-between px-4 lg:px-8">
        <Link href="/">
          <Image
            src="/images/Logo Ikobana.png"
            alt="Logo Ikobana"
            width={106}
            height={45}
            priority
          />
        </Link>

        <div>
          <ProfileDropdown email={user.email || ""} />
        </div>
      </nav>
    </header>
  );
}

type ProfileDropdownProps = {
  email: string;
};

const ProfileDropdown = ({ email }: ProfileDropdownProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(resetUser());
    deleteCookie("at");
    deleteCookie("rt");
    router.push("/admin/login");
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      !dropdownRef.current?.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative flex items-center gap-2">
      <Avatar name={"Admin"} />

      <div className="max-w-[80px] truncate">
        <p className="text-sm font-semibold leading-4">Admin</p>
      </div>

      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle profile menu"
        className="text-gray-500 transition-colors hover:text-gray-700"
      >
        {isOpen ? (
          <RiArrowUpSLine className="h-5 w-5" />
        ) : (
          <RiArrowDownSLine className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
        >
          <div className="px-4 py-2">
            <p className="truncate font-medium text-gray-900" id="user-name">
              Admin
            </p>
            <Tooltip anchorSelect="#user-name" place="bottom">
              <p className="text-[10px]">Admin</p>
            </Tooltip>
            <p className="truncate text-xs text-gray-500 mt-1" id="user-email">
              {email}
            </p>
            <Tooltip anchorSelect="#user-email" place="bottom">
              <p className="text-[10px]">{email}</p>
            </Tooltip>
          </div>

          <div className="my-1 border-t border-gray-200"></div>

          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-alert-danger hover:bg-alert-danger/10 hover:border-l-4 border-alert-danger hover:text-alert-danger  transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default function NavbarAdmin() {
  return (
    <Suspense>
      <NavbarAdminComponent />
    </Suspense>
  );
}

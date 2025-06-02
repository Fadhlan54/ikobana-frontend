"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { resetUser, selectUser, setUser } from "@/redux/slices/user";
import { getUserProfile } from "@/service/user.service";
import { deleteCookie } from "@/utils/cookies";
import { Address, AddressResponse } from "@/interface/address";
import Button from "../elements/Button";
import Avatar from "../elements/Avatar";
import { Tooltip } from "react-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
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

  const handleLoginModal = () => {
    dispatch(setShowModal("login"));
  };

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

  return (
    <header className="sticky top-0 z-30 h-[70px] bg-white shadow-md">
      <nav className=" mx-auto flex h-full items-center justify-between px-4 lg:px-8 ">
        <Link href="/">
          <Image
            src="/images/Logo Ikobana.png"
            alt="Logo Ikobana"
            width={106}
            height={45}
            priority
          />
        </Link>

        <ul className="flex items-center gap-5 text-sm font-semibold">
          <NavLink href="/" text="Beranda" />
          <NavLink href="/products" text="Produk" />
          {!user.id && <NavLink href="/cart" text="Keranjang" />}
          <li>
            {user.id ? (
              <ProfileDropdown
                name={user.name || ""}
                email={user.email || ""}
              />
            ) : (
              <Button
                variant="primary"
                handleClick={handleLoginModal}
                className="px-4 py-2 text-sm"
              >
                Masuk
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

type NavLinkProps = {
  href: string;
  text?: string;
};

const NavLink = ({ href, text }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      className="text-gray-700 transition-colors hover:text-primary-1 hover:underline"
    >
      {text}
    </Link>
  </li>
);

type ProfileDropdownProps = {
  name: string;
  email: string;
};

const ProfileDropdown = ({ name, email }: ProfileDropdownProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [firstName, lastName] = name.split(" ");
  const router = useRouter();

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(resetUser());
    deleteCookie("at");
    deleteCookie("rt");
    router.push("/");
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
      <Avatar name={name} />

      <div className="max-w-[80px] truncate">
        <p className="text-sm font-semibold leading-4">
          {lastName || firstName ? `Hi, ${lastName || firstName}` : "Loading"}
        </p>
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
              {name}
            </p>
            <Tooltip anchorSelect="#user-name" place="bottom">
              <p className="text-[10px]">{name}</p>
            </Tooltip>
            <p className="truncate text-xs text-gray-500 mt-1" id="user-email">
              {email}
            </p>
            <Tooltip anchorSelect="#user-email" place="bottom">
              <p className="text-[10px]">{email}</p>
            </Tooltip>
          </div>

          <div className="my-1 border-t border-gray-200"></div>

          <Link
            href="/profile"
            className="block px-4 py-2 hover:border-l-4 border-primary-1 hover:text-primary-1 hover:bg-primary-1/10 text-gray-700 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/cart"
            className="block px-4 py-2 hover:border-l-4 border-primary-1 hover:text-primary-1 hover:bg-primary-1/10 text-gray-700 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Keranjang
          </Link>
          <Link
            href="/order-history"
            className="block px-4 py-2 hover:border-l-4 border-primary-1 hover:text-primary-1 hover:bg-primary-1/10 text-gray-700 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Pesanan
          </Link>
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

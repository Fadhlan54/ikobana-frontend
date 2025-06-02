"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

type NavItemProps = {
  children: React.ReactNode;
  href: string;
  subItems?: { name: string; href: string }[];
};

export default function NavItem({
  children,
  href,
  subItems = [],
}: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName.startsWith(href) && href !== "/");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  if (subItems.length > 0) {
    return (
      <ul>
        <button
          onClick={toggleMenu}
          className={`mb-1 flex w-full items-center justify-between gap-2 px-4 py-2 transition-all hover:border-s-4 hover:bg-soft-1 hover:ps-3 hover:text-primary-1 ${
            isActive ? "border-s-4 bg-primary-1/10 ps-3 text-primary-1" : ""
          }`}
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-4">{children}</span>
          {isOpen ? (
            <RiArrowUpSLine className="h-5 w-5" />
          ) : (
            <RiArrowDownSLine className="h-5 w-5" />
          )}
        </button>

        {isOpen && (
          <ul>
            {subItems.map((subItem, index) => {
              const isSubItemActive = pathName === subItem.href;
              return (
                <li key={index}>
                  <Link
                    href={subItem.href}
                    className={`mb-1 flex w-full items-center gap-2 py-2 pe-4 ps-[3.25rem] transition-all hover:border-s-4 hover:bg-primary-1/10 hover:ps-12 hover:text-primary-1 ${
                      isSubItemActive
                        ? "border-s-4 bg-primary-1/10 ps-12 text-primary-1"
                        : ""
                    }`}
                  >
                    {subItem.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </ul>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className={`flex w-full items-center gap-4 px-4 py-2 transition-all hover:border-s-4 hover:bg-primary-1/10 hover:ps-3 hover:text-primary-1 ${
          isActive ? "border-s-4 bg-primary-1/10 ps-3 text-primary-1" : ""
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

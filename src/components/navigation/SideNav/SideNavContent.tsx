import NavItem from "./NavItem";
import { RiHomeLine } from "react-icons/ri";
import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineReceipt,
} from "react-icons/md";

export default function SideNavContent() {
  return (
    <ul className="space-y-2 overflow-y-auto px-2 text-sm">
      <NavItem href={"/admin/dashboard"}>
        <RiHomeLine size={20} />
        Dasboard
      </NavItem>
      <NavItem href={"/admin/categories"}>
        <MdOutlineDashboard size={20} />
        Kategori
      </NavItem>
      <NavItem href={"/admin/products"}>
        <MdOutlineInventory2 size={20} />
        Produk
      </NavItem>
      <NavItem href={"/admin/transactions"}>
        <MdOutlineReceipt size={20} />
        Transaksi
      </NavItem>
    </ul>
  );
}

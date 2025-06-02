import NavbarAdmin from "@/components/navigation/NavbarAdmin";
import SideNav from "@/components/navigation/SideNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarAdmin />
      <div className="flex">
        <SideNav />
        <div className="p-4 w-full overflow-auto max-h-[calc(100svh_-_70px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

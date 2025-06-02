import ModalManagement from "@/components/fragments/ModalManagement";
import Navbar from "@/components/navigation/Navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ModalManagement />
      <Navbar />
      {children}
    </div>
  );
}

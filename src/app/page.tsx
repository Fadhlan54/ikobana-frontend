import LandingPage from "@/components/fragments/LandingPage";
import ModalManagement from "@/components/fragments/ModalManagement";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ModalManagement />
      <LandingPage />
    </div>
  );
}

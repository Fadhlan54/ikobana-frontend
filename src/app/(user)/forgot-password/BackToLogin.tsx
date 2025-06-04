import Button from "@/components/elements/Button";
import { useAppDispatch } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { useRouter } from "next/router";

export default function BackToLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleBackToLogin = () => {
    dispatch(setShowModal("login"));
    router.push("/");
  };
  return (
    <div className="text-center text-sm">
      <Button
        className="font-medium  hover:text-primary-1 hover:underline"
        handleClick={handleBackToLogin}
      >
        Remember your password? Sign in
      </Button>
    </div>
  );
}

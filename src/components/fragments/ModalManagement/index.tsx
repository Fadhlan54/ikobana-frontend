"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectShowModal } from "@/redux/slices/modalManagementSlice";
import LoginModal from "../Login";
import RegisterModal from "../Register";
import AddAddressModal from "../AddAddress";
import EditAddressModal from "../EditAddress";

export default function ModalManagement() {
  const showModal = useAppSelector(selectShowModal);

  if (showModal === "login") return <LoginModal />;
  if (showModal === "register") return <RegisterModal />;
  if (showModal === "add-address") return <AddAddressModal />;
  if (showModal === "edit-address") return <EditAddressModal />;
  return null;
}

"use client";

import Container from "@/components/elements/Container";
import Select from "@/components/elements/inputs/Select";
import { Address } from "@/interface/address";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEditAddress } from "@/redux/slices/editAddress";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { selectUser } from "@/redux/slices/user";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// type Props<TFieldValues extends FieldValues> = {
//   register: UseFormRegister<TFieldValues>;
// };

type FormValues = {
  addressID: number;
};

export default function DestinationAddress({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: Address | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}) {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectUser)?.addresses;
  const { register, watch } = useForm<FormValues>();
  const addressID = Number(watch("addressID"));

  const handleShowAddressModal = (type: "add" | "edit", id?: number) => {
    dispatch(setEditAddress(id));
    dispatch(setShowModal(`${type}-address`));
  };

  useEffect(() => {
    if (addressID && addresses.length > 0) {
      setSelectedAddress(
        addresses.find((address) => address.id === addressID) || null
      );
    } else {
      setSelectedAddress(null);
    }
  }, [addressID, addresses, setSelectedAddress]);

  return (
    <Container>
      <h2 className="mb-2 font-semibold">Alamat Pengiriman</h2>
      {addresses.length === 0 && (
        <div className="flex flex-col items-center border border-neutral-4 rounded-md p-4">
          <Image
            src={"/images/empty address.png"}
            width={100}
            height={100}
            alt="empty address"
          />
          <p className="font-semibold">Alamat masih kosong.</p>
          <button
            className="text-sm text-primary-1 hover:underline text-center w-full"
            onClick={() => handleShowAddressModal("add")}
          >
            Tambah Alamat
          </button>
        </div>
      )}
      {addresses.length > 0 && (
        <div>
          <Select
            id="addressID"
            label="Alamat"
            options={addresses.map((address) => ({
              value: address.id,
              label: address.label,
            }))}
            register={register}
            placeholder="Pilih Alamat"
          />
          <button
            className="text-sm text-primary-1 hover:underline mb-2"
            onClick={() => handleShowAddressModal("add")}
          >
            Tambah Alamat
          </button>
          <label
            htmlFor="address"
            className="w-full block font-semibold text-sm mb-0.5"
          >
            Alamat Lengkap
          </label>
          <textarea
            name="address"
            id="address"
            className="w-full border border-neutral-4 rounded-md p-1.5 text-sm -mb-1.5"
            rows={3}
            disabled
            value={
              selectedAddress
                ? `${selectedAddress.street}, Kel. ${selectedAddress.subDistrict}, Kec. ${selectedAddress.district}, ${selectedAddress.city}, ${selectedAddress.postalCode}`
                : ""
            }
          ></textarea>
          <button
            className="text-sm text-primary-1 hover:underline mb-2"
            onClick={() => handleShowAddressModal("edit", selectedAddress?.id)}
          >
            Ubah Alamat
          </button>
        </div>
      )}
    </Container>
  );
}

import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import Modal from "@/components/elements/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectEditAddress, setEditAddress } from "@/redux/slices/editAddress";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { selectUser, setUser } from "@/redux/slices/user";
import { editUserAddress } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  label: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  postalCode: number;
};

export default function EditAddressModal() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);
  const addressList = userData.addresses;
  const editAddressID = useAppSelector(selectEditAddress);
  const existingAddress =
    addressList.find((address) => address.id === editAddressID) || null;
  const { mutate, isPending } = useMutation({
    mutationFn: editUserAddress,
    onSuccess: (_, variables) => {
      toast.success("Berhasil mengubah alamat");
      const updatedAddresses = addressList.map((address) =>
        address.id === editAddressID ? { ...address, ...variables } : address
      );
      dispatch(
        setUser({
          ...userData,
          addresses: updatedAddresses,
        })
      );
      dispatch(setEditAddress(null));
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      dispatch(setShowModal(null));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      city: existingAddress?.city || "",
      district: existingAddress?.district || "",
      subDistrict: existingAddress?.subDistrict || "",
      street: existingAddress?.street || "",
      postalCode: existingAddress?.postalCode || 0,
      label: existingAddress?.label || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      id: existingAddress?.id || 0,
      ...data,
    });
  };

  useEffect(() => {
    if (!existingAddress) {
      dispatch(setShowModal(null));
    }
  }, [existingAddress, dispatch]);

  return (
    <Modal title="Ubah Alamat">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="">
          <TextInput
            id="label"
            label="Label"
            placeholder="Masukkan label"
            register={register}
            error={errors.label?.message}
            size="sm"
            required
          />
          <p className="text-xs mt-1 font-medium text-neutral-5">
            Contoh: Rumah, Kantor, dll
          </p>
        </div>

        <TextInput
          id="city"
          label="Kota/Kabupaten"
          placeholder="Masukkan kota"
          register={register}
          error={errors.city?.message}
          size="sm"
          required
        />
        <TextInput
          id="district"
          label="Kecamatan"
          placeholder="Masukkan kecamatan"
          register={register}
          error={errors.district?.message}
          size="sm"
          required
        />
        <TextInput
          id="subDistrict"
          label="Kelurahan"
          placeholder="Masukkan kelurahan"
          register={register}
          error={errors.subDistrict?.message}
          size="sm"
          required
        />
        <TextInput
          id="street"
          label="Jalan"
          placeholder="Masukkan jalan"
          register={register}
          error={errors.street?.message}
          size="sm"
          required
        />
        <TextInput
          id="postalCode"
          label="Kode Pos"
          placeholder="Masukkan kode pos"
          type="number"
          register={register}
          error={errors.postalCode?.message}
          size="sm"
          required
        />
        <div className="flex justify-end gap-2">
          <Button
            type="reset"
            variant="danger"
            size="sm"
            handleClick={() => dispatch(setShowModal(null))}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isPending}
          >
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
}

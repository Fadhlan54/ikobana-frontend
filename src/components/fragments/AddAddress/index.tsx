import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import Modal from "@/components/elements/Modal";
import { CreateAddressResponse } from "@/interface/address";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { selectUser, setUser } from "@/redux/slices/user";
import { createUserAddress } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";
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

export default function AddAddressModal() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: createUserAddress,
    onSuccess: (data: CreateAddressResponse) => {
      dispatch(
        setUser({
          ...user,
          addresses: [
            ...user.addresses,
            {
              id: data.result.id,
              label: data.result.label,
              city: data.result.city,
              district: data.result.district,
              subDistrict: data.result.sub_district,
              street: data.result.street,
              postalCode: data.result.postal_code,
            },
          ],
        })
      );
      toast.success("Alamat berhasil ditambahkan");
      dispatch(setShowModal(null));
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      dispatch(setShowModal(null));
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <Modal title="Tambah Alamat">
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

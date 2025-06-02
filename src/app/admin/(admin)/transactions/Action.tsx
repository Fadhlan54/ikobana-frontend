import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import {
  cancelTransaction,
  completeTransaction,
  deliverTransaction,
  processTransaction,
} from "@/service/transaction.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type UpdateTransaction = ({
  status,
  trackingCode,
}: {
  status: string;
  trackingCode?: string;
}) => void;

type Delivery = {
  courier: string;
  shipping_type: string;
};

type Props = {
  transactionID: string;
  status: string;
  updateTransaction: UpdateTransaction;
  delivery: Delivery;
};

export default function TransactionActions({
  transactionID,
  status,
  delivery,
  updateTransaction,
}: Props) {
  if (status === "not_paid") {
    return (
      <CancelTransaction
        transactionID={transactionID}
        updateTransaction={updateTransaction}
      />
    );
  }

  if (status === "paid") {
    return (
      <ProcessTransaction
        transactionID={transactionID}
        updateTransaction={updateTransaction}
      />
    );
  }

  if (status === "processing") {
    return (
      <DeliverTransaction
        transactionID={transactionID}
        updateTransaction={updateTransaction}
        delivery={delivery}
      />
    );
  }

  if (status === "on_delivery") {
    return (
      <CompleteTransaction
        transactionID={transactionID}
        updateTransaction={updateTransaction}
      />
    );
  }

  return null;
}

function CancelTransaction({
  transactionID,
  updateTransaction,
}: {
  transactionID: string;
  updateTransaction: UpdateTransaction;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => cancelTransaction(transactionID),
    onSuccess: () => {
      toast.success("Transaksi berhasil dibatalkan");
      updateTransaction({ status: "canceled" });
    },
    onError: () => {
      toast.error("Transaksi gagal dibatalkan");
    },
  });

  return (
    <Button variant="danger" handleClick={() => mutate()} disabled={isPending}>
      {isPending ? "loading" : "Batalkan Transaksi"}
    </Button>
  );
}

function ProcessTransaction({
  transactionID,
  updateTransaction,
}: {
  transactionID: string;
  updateTransaction: UpdateTransaction;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => processTransaction(transactionID),
    onSuccess: () => {
      toast.success("Transaksi berhasil diproses");
      updateTransaction({ status: "processing" });
    },
    onError: () => {
      toast.error("Transaksi gagal diproses");
    },
  });
  return (
    <Button variant="primary" handleClick={() => mutate()} disabled={isPending}>
      {isPending ? "loading" : "Proses Transaksi"}
    </Button>
  );
}

type FormValues = {
  trackingCode: string;
};

function DeliverTransaction({
  transactionID,
  updateTransaction,
  delivery,
}: {
  transactionID: string;
  updateTransaction: UpdateTransaction;
  delivery: Delivery;
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const trackingCode = watch("trackingCode") || "";
  const { mutate, isPending } = useMutation({
    mutationFn: () => deliverTransaction(transactionID, trackingCode),
    onSuccess: () => {
      toast.success("Transaksi berhasil dikirim");
      updateTransaction({ status: "on_delivery", trackingCode });
    },
    onError: () => {
      toast.error("Transaksi gagal dikirim");
    },
  });

  const onSubmit = () => {
    mutate();
  };

  const freeDelivery =
    delivery.shipping_type === "Free Delivery" &&
    delivery.courier === "Ikobana";
  return (
    <form
      className="p-3 space-y-4 border border-neutral-4 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextInput
          id="trackingCode"
          label="Resi"
          placeholder="Masukkan resi"
          register={register}
          size="sm"
          disabled={isPending || freeDelivery}
          required={!freeDelivery && "Resi harus diisi"}
          error={errors.trackingCode?.message}
        />
        {delivery.shipping_type === "Free Delivery" &&
          delivery.courier === "Ikobana" && (
            <p className="text-xs mt-1 text-gray-500">
              *Pengiriman gratis, tidak perlu mengisi resi
            </p>
          )}
      </div>

      <Button variant="primary" type="submit" disabled={isPending}>
        {isPending ? "loading" : "Kirim Transaksi"}
      </Button>
    </form>
  );
}

function CompleteTransaction({
  transactionID,
  updateTransaction,
}: {
  transactionID: string;
  updateTransaction: UpdateTransaction;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => completeTransaction(transactionID),
    onSuccess: () => {
      toast.success("Transaksi berhasil selesai");
      updateTransaction({ status: "completed" });
    },
    onError: () => {
      toast.error("Transaksi gagal selesai");
    },
  });
  return (
    <Button variant="primary" handleClick={() => mutate()} disabled={isPending}>
      {isPending ? "loading" : "Selesaikan Transaksi"}
    </Button>
  );
}

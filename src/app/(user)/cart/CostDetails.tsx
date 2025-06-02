import Container from "@/components/elements/Container";
import { Address } from "@/interface/address";
import { CartItemType } from "@/interface/cart";
import { DeliveryData } from "@/interface/delivery";
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
} from "@/interface/createTransaction";
import { createTransaction } from "@/service/transaction.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  address: Address | null;
  cartItems: CartItemType[];
  deliveryData: DeliveryData;
  totalProductPrice: number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};

export default function CostDetails({
  address,
  cartItems,
  setCartItems,
  deliveryData,
  totalProductPrice = 0,
}: Props) {
  const { mutate } = useMutation({
    mutationFn: createTransaction,
    onSuccess: (response: CreateTransactionResponse) => {
      toast.success("Pesanan berhasil ditambahkan");
      localStorage.removeItem("cart");
      setCartItems([]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).snap?.pay(response.result.payment.token);
    },
  });

  function handleCheckout() {
    if (!address?.postalCode) {
      toast.error("Pilih alamat pengiriman terlebih dahulu");
      return;
    }
    if (!deliveryData?.service) {
      toast.error("Pilih metode pengiriman terlebih dahulu");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Keranjang kosong");
      return;
    }

    if (!totalProductPrice) {
      toast.error("Keranjang kosong");
      return;
    }
    const data: CreateTransactionRequest = {
      products: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.count,
      })),
      destination: {
        ...address,
        postal_code: address.postalCode,
        sub_district: address.subDistrict,
      },
      shipping: {
        service_type: deliveryData.service,
        courier: deliveryData.courier,
      },
    };

    mutate(data);
  }

  useEffect(() => {
    const snapMidtransScriptURL =
      "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = snapMidtransScriptURL;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container>
      <h2 className="mb-2 font-semibold">Rincian Biaya</h2>
      <Row label="Subtotal" value={`Rp ${totalProductPrice}`} />
      <Row
        label="Ongkir"
        value={
          (deliveryData?.cost && deliveryData.service) ||
          deliveryData?.cost === 0
            ? `Rp ${deliveryData?.cost}`
            : "-"
        }
      />
      <hr className="my-1.5 border-neutral-4" />
      <Row
        label="Total"
        value={`Rp ${deliveryData.cost + totalProductPrice}`}
      />
      <button
        className="text-sm text-white bg-primary-1 hover:bg-primary-2 focus:bg-primary-3 py-1.5 font-medium mt-2 px-2 rounded-md  text-center w-full"
        onClick={handleCheckout}
      >
        Proses Pembayaran
      </button>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <p className={label === "Total" ? "font-semibold" : ""}>{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

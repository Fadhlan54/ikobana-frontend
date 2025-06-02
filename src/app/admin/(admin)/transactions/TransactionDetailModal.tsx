"use client";

import Modal from "@/components/elements/Modal";
import StatusBadge from "@/components/elements/StatusBadge";
import { GetTransactionData } from "@/interface/getTransaction";
import dateParser from "@/utils/dateParser";
import TransactionActions from "./Action";

interface TransactionDetailModalProps {
  transaction: GetTransactionData;
  onClose: () => void;
  updateTransaction: (transaction: GetTransactionData) => void;
  setTransaction: React.Dispatch<
    React.SetStateAction<GetTransactionData | null>
  >;
}

export default function TransactionDetailModal({
  transaction,
  setTransaction,
  onClose,
  updateTransaction,
}: TransactionDetailModalProps) {
  const handleUpdateTransaction = ({
    status,
    trackingCode,
  }: {
    status: string;
    trackingCode?: string;
  }) => {
    const newTransaction: GetTransactionData = {
      ...transaction,
      status,
      shipping_provider: {
        ...transaction.shipping_provider,
        ...(trackingCode && { tracking_code: trackingCode }),
      },
    };
    updateTransaction(newTransaction);
    setTransaction(newTransaction);
  };
  return (
    <Modal title="Detail Transaksi" onClose={onClose} width="580px">
      <div className="space-y-6">
        {(transaction.status === "not_paid" ||
          transaction.status === "paid" ||
          transaction.status === "processing" ||
          transaction.status === "on_delivery") && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Perbarui Status Transaksi
            </h3>
            <TransactionActions
              transactionID={transaction.id}
              status={transaction.status}
              updateTransaction={handleUpdateTransaction}
              delivery={{
                shipping_type: transaction.shipping_provider.service_type,
                courier: transaction.shipping_provider.courier,
              }}
            />
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Informasi Transaksi
          </h3>
          <dl className="mt-2 space-y-2 p-3 bg-gray-200/40 rounded-md text-sm">
            <dl className="flex justify-between">
              <dt className="font-medium text-gray-500">Status</dt>
              <dd className="text-gray-900">
                <StatusBadge status={transaction.status} />
              </dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="font-medium text-gray-500">ID Transaksi</dt>
              <dd className="text-gray-900">{transaction.id}</dd>
            </dl>
            <dl className="flex justify-between">
              <dt className="font-medium text-gray-500">Tanggal</dt>
              <dd className="text-gray-900">
                {dateParser(transaction.created_at, { showDayName: true })}
              </dd>
            </dl>

            {transaction.payment_method && (
              <dl className="flex justify-between">
                <dt className="font-medium text-gray-500">Metode Pembayaran</dt>
                <dd className="text-gray-900">
                  {transaction.payment_method || "-"}
                </dd>
              </dl>
            )}
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Informasi Pelanggan
          </h3>
          <dl className="mt-2 space-y-2 p-3 bg-gray-200/40 rounded-md text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Nama</dt>
              <dd className="text-gray-900">{transaction.user.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="text-gray-900">{transaction.user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Telepon</dt>
              <dd className="text-gray-900">
                +62{transaction.user.phone_number}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Alamat Pengiriman
          </h3>
          <div className="mt-2 p-3 bg-gray-200/40 rounded-md">
            <p className="text-sm text-gray-900">
              {transaction.destination.street},{" "}
              {transaction.destination.sub_district}
            </p>
            <p className="text-sm text-gray-900">
              {transaction.destination.district}, {transaction.destination.city}
              , {transaction.destination.postal_code}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Pengiriman</h3>
          <div className="mt-2 p-3 bg-gray-200/40 rounded-md">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Kurir</span>
              <span className="text-sm text-gray-900">
                {transaction.shipping_provider.courier} (
                {transaction.shipping_provider.service_type})
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm font-medium text-gray-500">
                No. Resi
              </span>
              <span className="text-sm text-gray-900">
                {transaction.shipping_provider.tracking_code || "-"}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm font-medium text-gray-500">
                Ongkos Kirim
              </span>
              <span className="text-sm text-gray-900">
                Rp
                {transaction.shipping_provider.shipping_cost.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Ringkasan Pembayaran
          </h3>
          <div className="mt-2 p-3 bg-gray-200/40 rounded-md space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                Subtotal Produk
              </span>
              <span className="text-sm text-gray-900">
                Rp{transaction.total_product_price.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Ongkir</span>
              <span className="text-sm text-gray-900">
                Rp
                {transaction.shipping_provider.shipping_cost.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-900">
                Total Pembayaran
              </span>
              <span className="text-sm font-bold text-gray-900">
                Rp{transaction.total_price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

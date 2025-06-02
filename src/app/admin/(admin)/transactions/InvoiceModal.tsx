"use client";

import Modal from "@/components/elements/Modal";
import { GetTransactionData } from "@/interface/getTransaction";
import dateParser from "@/utils/dateParser";
import Button from "@/components/elements/Button";
import { FaPrint } from "react-icons/fa";
import StatusBadge from "@/components/elements/StatusBadge";

interface InvoiceModalProps {
  transaction: GetTransactionData;
  onClose: () => void;
}

export default function InvoiceModal({
  transaction,
  onClose,
}: InvoiceModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const status = transaction.status;

  const failedStatuses = ["canceled", "denied", "expired", "not_paid"];

  return (
    <Modal title="Invoice Transaksi" onClose={onClose} width="600px">
      <div className="space-y-6">
        <div>
          <StatusBadge
            status={failedStatuses.includes(status) ? "not_paid" : "paid"}
            size="md"
          />
          <div className="flex justify-between items-start mt-3">
            <div>
              <h2 className="text-xl font-bold">INVOICE</h2>
              <p className="text-sm text-gray-500">#{transaction.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-800 font-semibold">
                Tanggal Pemesanan
              </p>
              <p className="text-sm text-gray-500">
                {dateParser(transaction.created_at, { showDayName: false })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Dari:</h3>
            <p className="text-sm text-gray-900">Ikobana Frozen Food</p>
            <p className="text-sm text-gray-900">
              Jl. Villa Nusa Indah 2, Blok Z6 No. 14, Kel. Bojong Kulur, Kec.
              Gunung Putri
            </p>
            <p className="text-sm text-gray-900">Kab. Bogor, 16969</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-md">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Kepada:</h3>
            <p className="text-sm text-gray-900">{transaction.user.name}</p>
            <p className="text-sm text-gray-900">{transaction.user.email}</p>
            <p className="text-sm text-gray-900">
              {transaction.user.phone_number}
            </p>
            <p className="text-sm text-gray-900">
              {transaction.destination.street}, {transaction.destination.city}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Detail Produk</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produk
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transaction.items.map((item) => (
                  <tr key={item.product_id}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      {item.product_name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      Rp{item.product_price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                      Rp
                      {(item.product_price * item.quantity).toLocaleString(
                        "id-ID"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-md space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">Subtotal</span>
            <span className="text-sm text-gray-900">
              Rp{transaction.total_product_price.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
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
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-base font-bold text-gray-900">
              Rp{transaction.total_price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="primary" handleClick={handlePrint}>
            <FaPrint className="mr-2" /> Cetak
          </Button>
        </div>
      </div>
    </Modal>
  );
}

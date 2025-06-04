import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import {
  GetTransactionData,
  GetTransactionResponse,
} from "@/interface/getTransaction";
import { getAllTransactions } from "@/service/transaction.service";
import dateParser from "@/utils/dateParser";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import InvoiceModal from "./InvoiceModal";
import StatusBadge from "@/components/elements/StatusBadge";
import TransactionDetailModal from "./TransactionDetailModal";
import { Tooltip } from "react-tooltip";

export default function ManageTransactions() {
  const [transactions, setTransactions] = useState<GetTransactionData[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<GetTransactionData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: getAllTransactions,
    onSuccess: (data: GetTransactionResponse) => {
      console.log(data.result.transactions);
      setTransactions(data.result.transactions);
    },
  });

  const handleViewDetail = (transaction: GetTransactionData) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleViewInvoice = (transaction: GetTransactionData) => {
    setSelectedTransaction(transaction);
    setShowInvoiceModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setShowInvoiceModal(false);
    setSelectedTransaction(null);
  };

  const updateTransaction = (updatedTransaction: GetTransactionData) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === updatedTransaction.id) {
        return updatedTransaction;
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <div>
      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size={72} className="text-primary-3" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Transaksi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions?.map((transaction, index) => (
                <tr key={`${transaction.id}-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <p
                      className="max-w-[180px] truncate"
                      id={`transactionID-${index}`}
                    >
                      {transaction.id}
                    </p>
                    <Tooltip
                      anchorSelect={`#transactionID-${index}`}
                      content={transaction.id}
                      opacity={0.75}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dateParser(transaction.created_at, { showDayName: false })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp{transaction.total_price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        handleClick={() => handleViewDetail(transaction)}
                      >
                        <FaEye className="mr-1" /> Detail
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        handleClick={() => handleViewInvoice(transaction)}
                      >
                        <FaFileInvoice className="mr-1" /> Invoice
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {transactions?.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Tidak ada data transaksi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedTransaction && (
        <>
          {showDetailModal && (
            <TransactionDetailModal
              transaction={selectedTransaction}
              setTransaction={setSelectedTransaction}
              onClose={handleCloseModal}
              updateTransaction={updateTransaction}
            />
          )}
          {showInvoiceModal && (
            <InvoiceModal
              transaction={selectedTransaction}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
}

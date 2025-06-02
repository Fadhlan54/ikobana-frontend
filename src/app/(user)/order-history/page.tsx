"use client";

import { getAllUserTransaction } from "@/service/transaction.service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  GetTransactionUserResponse,
  UserTransactionData,
} from "@/interface/transactionUser";
import OrderContainer from "./OrderItemContainer";

export default function Orders() {
  const [transactions, setTransactions] = useState<UserTransactionData[]>([]);
  const { mutate }: UseMutationResult<GetTransactionUserResponse, Error, void> =
    useMutation({
      mutationFn: getAllUserTransaction,
      onSuccess: (data) => {
        setTransactions(data.result);
      },
    });

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <div className="px-4 lg:px-8 py-4">
      <h1 className="text-2xl font-semibold mb-4">Riwayat Pesanan</h1>
      <div className="space-y-4">
        {transactions.map((transaction: UserTransactionData) => (
          <OrderContainer key={`trx-item-${transaction.id}`} {...transaction} />
        ))}
      </div>
    </div>
  );
}

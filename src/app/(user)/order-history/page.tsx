"use client";

import { getAllUserTransaction } from "@/service/transaction.service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  GetTransactionUserResponse,
  UserTransactionData,
} from "@/interface/transactionUser";
import OrderContainer from "./OrderItemContainer";
import Image from "next/image";
import Link from "next/link";
import LoadingOrder from "./LoadingOrder";

export default function Orders() {
  const [transactions, setTransactions] = useState<UserTransactionData[]>([]);
  const {
    mutate,
    isPending,
  }: UseMutationResult<GetTransactionUserResponse, Error, void> = useMutation({
    mutationFn: getAllUserTransaction,
    onSuccess: (data) => {
      if (data?.result?.length > 0) {
        setTransactions(data.result);
      } else {
        setTransactions([]);
      }
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <div className="px-4 lg:px-8 py-4">
      <h1 className="text-2xl font-semibold mb-4">Riwayat Pesanan</h1>
      <div className="space-y-4">
        {transactions.length > 0 &&
          transactions.map((transaction: UserTransactionData) => (
            <OrderContainer
              key={`trx-item-${transaction.id}`}
              {...transaction}
            />
          ))}
        {!isPending && transactions.length === 0 && (
          <div className="p-6 rounded-lg border border-neutral-200">
            <h2 className="text-center text-2xl font-semibold text-primary-1">
              Tidak ada riwayat pesanan
            </h2>
            <Image
              src="/images/empty cart.png"
              alt="empty order"
              width={200}
              height={200}
              className="object-contain mx-auto"
            />
            <p className="text-center">
              Riwayat pesananmu masih kosong, pergi ke halaman{" "}
              <Link href="/products" className="text-primary-1 hover:underline">
                Produk
              </Link>
              , untuk belanja.
            </p>
          </div>
        )}
        {isPending &&
          Array.from({ length: 3 }).map((_, index) => (
            <LoadingOrder key={`loading-order-${index}`} />
          ))}
      </div>
    </div>
  );
}

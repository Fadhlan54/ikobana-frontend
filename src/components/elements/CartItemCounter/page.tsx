"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

type CartItemType = {
  id: number;
  count: number;
};

type CartItemCounterProps = {
  productID: number;
  count: number;
  stock: number;
  autoUpdate?: boolean;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
};

export default function CartItemCounter({
  productID,
  count,
  stock,
  autoUpdate = false,
  setCount,
  handleIncrement,
  handleDecrement,
}: CartItemCounterProps) {
  const updateLocalStorage = (newCount: number) => {
    try {
      const cart = localStorage.getItem("cart") || "[]";
      const cartItems: CartItemType[] = JSON.parse(cart);
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === productID
      );

      if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].count = newCount;
      } else {
        cartItems.push({ id: productID, count: newCount });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const increment = () => {
    if (count >= stock) {
      toast.warning("Stok tidak mencukupi");
      return;
    }

    const newCount = count + 1;
    if (handleIncrement) {
      handleIncrement();
    } else if (setCount) {
      setCount(newCount);
    }
    if (autoUpdate) {
      updateLocalStorage(newCount);
    }
  };

  const decrement = () => {
    if (count <= 1) {
      toast.warning("Jumlah minimal 1");
      return;
    }

    const newCount = count - 1;
    if (handleDecrement) {
      handleDecrement();
    } else if (setCount) {
      setCount(newCount);
    }
    if (autoUpdate) {
      updateLocalStorage(newCount);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-fit">
      <button
        onClick={decrement}
        className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        disabled={count <= 1}
        aria-label="Kurangi jumlah"
      >
        <FaMinus size={10} />
      </button>

      <span className="w-6 text-center text-sm font-medium">{count}</span>

      <button
        onClick={increment}
        className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        disabled={count >= stock}
        aria-label="Tambah jumlah"
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
}

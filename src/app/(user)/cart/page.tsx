"use client";

import { useEffect, useState } from "react";
import CartItemsContainer from "./CartItemsContainer";
import CostDetails from "./CostDetails";
import DeliveryService from "./DeliveryService";
import DestinationAddress from "./DestinationAddress";
import { Address } from "@/interface/address";
import { CartItemType } from "@/interface/cart";
import { DeliveryData } from "@/interface/delivery";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deliveryData, setDeliveryData] = useState<DeliveryData>({
    cost: 0,
    courier: "",
    service: "",
  });

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setTotalProducts(parsedCart.length);
    }
  }, [selectedAddress]);

  return (
    <div className="px-4 lg:px-8 py-4">
      <h1 className="text-2xl font-semibold">Keranjang</h1>
      <h3 className="mb-4">
        Terdapat <span className="font-semibold">{totalProducts} produk </span>
        di keranjangmu
      </h3>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full">
          <CartItemsContainer
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </div>
        <div className="w-full md:w-72 shrink-0 space-y-4">
          <DestinationAddress
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <DeliveryService
            postalCode={selectedAddress?.postalCode || null}
            totalProductPrice={countTotalProductPrice(cartItems)}
            totalWeight={countTotalWeight(cartItems)}
            setDeliveryData={setDeliveryData}
          />
          <CostDetails
            address={selectedAddress}
            cartItems={cartItems}
            deliveryData={deliveryData}
            totalProductPrice={countTotalProductPrice(cartItems)}
            setCartItems={setCartItems}
          />
        </div>
      </div>
    </div>
  );
}

function countTotalProductPrice(cartItems: CartItemType[]) {
  return cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.count,
    0
  );
}

function countTotalWeight(cartItems: CartItemType[]) {
  return cartItems.reduce(
    (total, item) => total + (item.weight || 0) * item.count,
    0
  );
}

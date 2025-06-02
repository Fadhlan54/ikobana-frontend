"use client";

import Container from "@/components/elements/Container";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAllProducts } from "@/service/product.service";
import { ProductInterface } from "@/interface/product";
import CartItem from "./CartItem";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { CartItemType } from "@/interface/cart";

export default function CartItemsContainer({
  cartItems,
  setCartItems,
}: {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}) {
  const { mutate } = useMutation({
    mutationFn: getAllProducts,
    onSuccess: (data) => {
      const products = data.result.products;
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          const product = products.find(
            (p: ProductInterface) => p.ID === item.id
          );
          return product
            ? {
                ...item,
                image: product.image_url,
                name: product.name,
                weight: product.weight_per_unit,
                price: product.price,
                stock: product.stock,
              }
            : item;
        })
      );
    },
  });

  const handleProductCountIncrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleProductCountDecrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item
      )
    );
  };

  const handleDeleteProduct = (id: number) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((item) => item.id !== id))
    );
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Produk dihapus dari keranjang");
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    if (storedCart.length > 0) {
      const productIDs = storedCart.map((item: CartItemType) => item.id);
      mutate({ productIDs });
    }
  }, [mutate, setCartItems]);

  return (
    <Container>
      {cartItems.length === 0 && (
        <div className="flex flex-col items-center py-4">
          <p className="text-center text-2xl font-semibold">
            Keranjangmu masih kosong.
          </p>
          <Image
            src="/images/empty cart.png"
            width={200}
            height={200}
            alt="empty cart icon"
          />

          <p className="text-lg text-center">
            Yuk, mulai belanja dan temukan produk favoritmu!
            <br /> Pergi ke halaman{" "}
            <Link
              className="text-primary-1 hover:underline hover:text-primary-2 focus:text-primary-3 font-semibold"
              href={"/products"}
            >
              Produk
            </Link>
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <div className="grid grid-cols-12 mb-3">
            <RowTitle title="Produk" colSpan={5} />
            <RowTitle title="Harga" colSpan={2} />
            <RowTitle title="Jumlah" colSpan={2} />
            <RowTitle title="Subtotal" colSpan={2} />
          </div>
          <div>
            {cartItems.map((item) => (
              <CartItem
                key={`cart-item-${item.id}`}
                image={item.image || ""}
                name={item.name || ""}
                weight={item.weight || 0}
                price={item.price || 0}
                count={item.count}
                productID={item.id}
                stock={item.stock || 0}
                handleCountIncrement={() =>
                  handleProductCountIncrement(item.id)
                }
                handleCountDecrement={() =>
                  handleProductCountDecrement(item.id)
                }
                handleDeleteProduct={() => handleDeleteProduct(item.id)}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

function RowTitle({ title, colSpan = 1 }: { title: string; colSpan?: number }) {
  return (
    <h3
      className={`block font-semibold`}
      style={{ gridColumn: `span ${colSpan}` }}
    >
      {title}
    </h3>
  );
}

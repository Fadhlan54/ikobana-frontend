import CartItemCounter from "@/components/elements/CartItemCounter/page";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

export default function CartItem({
  productID,
  image,
  name,
  weight,
  price,
  count,
  stock,
  handleCountIncrement,
  handleCountDecrement,
  handleDeleteProduct,
}: {
  productID: number;
  image?: string;
  name: string;
  weight: number;
  price: number;
  count: number;
  stock: number;
  handleCountIncrement: () => void;
  handleCountDecrement: () => void;
  handleDeleteProduct: () => void;
}) {
  return (
    <div className="grid grid-cols-12 items-center py-4 border-t border-neutral-4">
      <div className="col-span-5 flex items-center gap-2">
        <div className="bg-neutral-600 h-[120px] w-[90px]">
          {image && (
            <Image
              width={90}
              height={120}
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-neutral-5 font-medium">{weight} g</p>
          <p className="text-sm text-neutral-5 font-medium">Stok: {stock}</p>
        </div>
      </div>
      <div className="col-span-2 font-semibold">
        {price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        })}
      </div>
      <div className="col-span-2 font-semibold">
        <CartItemCounter
          count={count}
          productID={productID}
          handleIncrement={handleCountIncrement}
          handleDecrement={handleCountDecrement}
          stock={stock}
        />
      </div>
      <div className="col-span-2 font-semibold">
        {(price * count).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        })}
      </div>
      <div className="col-span-1">
        <button
          className="text-alert-danger hover:text-alert-danger-2 focus:text-alert-danger-3 text-3xl  block mx-auto"
          onClick={handleDeleteProduct}
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

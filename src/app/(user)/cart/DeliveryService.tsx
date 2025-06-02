import Container from "@/components/elements/Container";
import RadioInput from "@/components/elements/inputs/RadioInput";
import Select from "@/components/elements/inputs/Select";
import {
  CheckShippingCostResponse,
  DeliveryData,
  DeliveryOptionsData,
} from "@/interface/delivery";
import { calculateShippingCost } from "@/service/transaction.service";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoQuestion } from "react-icons/go";
import { Tooltip } from "react-tooltip";

type FormValues = {
  deliveryType: "REGULAR" | "FREE";
  deliveryService: DeliveryData | null;
};

export default function DeliveryService({
  postalCode,
  totalWeight,
  totalProductPrice,
  setDeliveryData,
}: {
  postalCode: number | null;
  totalWeight: number | null;
  totalProductPrice: number | null;
  setDeliveryData: React.Dispatch<React.SetStateAction<DeliveryData>>;
}) {
  const [deliveryServiceOptions, setDeliveryServiceOptions] =
    useState<DeliveryOptionsData | null>();

  const { mutate } = useMutation({
    mutationFn: calculateShippingCost,
    onSuccess: (response: CheckShippingCostResponse) => {
      const result = response.result;
      console.log(response.result);
      setDeliveryServiceOptions(result);
    },
  });

  const { watch, control } = useForm<FormValues>({
    defaultValues: {
      deliveryType: "REGULAR",
    },
  });

  useEffect(() => {
    if (postalCode && totalWeight && totalProductPrice) {
      mutate({
        destinationPostalCode: postalCode,
        totalWeight,
        totalProductPrice,
      });
    }
  }, [mutate, postalCode, totalProductPrice, totalWeight]);

  const selectedService = watch("deliveryService");
  const selectedType = watch("deliveryType");

  useEffect(() => {
    if (selectedService) {
      setDeliveryData(selectedService);
    }

    if (selectedType === "FREE") {
      setDeliveryData({
        cost: 0,
        courier: "Ikobana",
        service: "Free Delivery",
      });
    }
  }, [setDeliveryData, selectedService, selectedType]);
  return (
    <Container>
      <h2 className="mb-2 font-semibold">Pengiriman</h2>
      <label
        htmlFor={"deliveryType"}
        className="font-semibold text-sm mb-1 flex items-center gap-1"
      >
        Jenis Pengiriman{" "}
        <span id="free-delivery-terms" className="hover:text-primary-3">
          <GoQuestion size={16} />
        </span>
      </label>
      <Tooltip anchorSelect="#free-delivery-terms">
        <div className="w-fit max-w-[240px] text-xs">
          <p>
            Pengiriman gratis hanya berlaku untuk pembelian di atas Rp 100.000
            dan pengiriman ke kecamatan :
          </p>
          <ul className="ml-4 mt-1 space-y-1">
            <li className="list-disc">
              <span className="font-semibold">Jatiasih</span> <br />
              Kode pos: 17421, 17422, 17423, 17424, 17425, 17426
            </li>
            <li className="list-disc">
              <span className="font-semibold">Gunung Putri</span> <br />
              Kode pos: 16960, 16961, 16962, 16963, 16964, 16965, 16966, 16967,
              16968, 16969
            </li>
          </ul>
        </div>
      </Tooltip>
      <Select
        id="deliveryType"
        options={[
          {
            value: "REGULAR",
            label: "Reguler",
          },
          {
            value: "FREE",
            label: "Gratis",
            disabled: !validateFreeDelivery(postalCode, totalProductPrice),
          },
        ]}
        control={control}
      />

      <div>
        {selectedType === "REGULAR" &&
          deliveryServiceOptions?.calculate_reguler && (
            <Controller
              name="deliveryService"
              control={control}
              render={({ field }) => (
                <div>
                  <h3 className="block text-sm font-semibold mb-1 mt-2">
                    Layanan Pengiriman
                  </h3>
                  <div className="max-h-72 overflow-y-auto">
                    {deliveryServiceOptions?.calculate_reguler?.map(
                      (option) => {
                        const optionValue = {
                          courier: option.shipping_name,
                          service: option.service_name,
                          cost: option.shipping_cost,
                        };
                        const isSelected =
                          JSON.stringify(selectedService) ===
                          JSON.stringify(optionValue);

                        return (
                          <RadioInput
                            key={`shipping-${option.shipping_name}-${option.service_name}`}
                            id={`${option.shipping_name}-${option.service_name}`}
                            checked={isSelected}
                            onChange={() => field.onChange(optionValue)}
                            isSelected={isSelected}
                          >
                            <div className="flex flex-col text-sm">
                              <span className="font-medium text-neutral-8">
                                {option.shipping_name} - {option.service_name}
                              </span>
                              <span className="font-semibold text-primary-3 mt-1">
                                Rp{" "}
                                {option.shipping_cost.toLocaleString("id-ID")}
                              </span>
                              <span className="text-xs text-neutral-5 mt-1">
                                Estimasi:{" "}
                                {option.etd?.replace("day", "hari") || "-"}
                              </span>
                            </div>
                          </RadioInput>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            />
          )}

        {!postalCode && (
          <div className="flex flex-col items-center justify-center border border-neutral-4 rounded-md p-4 mt-3">
            <Image
              src={"/images/no address.png"}
              alt="no address"
              width={100}
              height={100}
            />
            <h3 className="text-sm font-semibold mt-2">
              Pilih alamat terlebih dahulu
            </h3>
          </div>
        )}
      </div>
    </Container>
  );
}

function validateFreeDelivery(
  postalCode: number | null,
  totalProductPrice: number | null
): boolean {
  if (!postalCode || !totalProductPrice) {
    return false;
  }

  if (
    totalProductPrice >= 100000 &&
    ((postalCode >= 17421 && postalCode <= 17426) ||
      (postalCode >= 16960 && postalCode <= 16969))
  ) {
    return true;
  }
  return false;
}

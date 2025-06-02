"use client";

import Checkbox from "@/components/elements/inputs/Checkbox";
import TextInput from "@/components/elements/inputs/TextInput";
import { useForm } from "react-hook-form";
import { MdOutlineFilterAlt } from "react-icons/md";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { getAllCategories } from "@/service/category.service";
import SkeletonLoading from "@/components/elements/loading/SkeletonLoading";

type ProductFilter = {
  category: string[];
  minPrice: string;
  maxPrice: string;
};

type CategoryResponse = {
  id: number;
  name: string;
};

function Filter() {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ProductFilter>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");
  const categories = watch("category");

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);
  const debouncedCategories = useDebounce(categories, 500);

  const [categoriesData, setCategoriesData] = useState<CategoryResponse[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: getAllCategories,
    onSuccess: (response) => {
      const result = response.result;
      const categoryRes = result.map((item: CategoryResponse) => ({
        id: item.id,
        name: item.name,
      }));
      setCategoriesData(categoryRes);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedMinPrice) {
      params.set("min_price", debouncedMinPrice);
    } else {
      params.delete("min_price");
    }

    if (debouncedMaxPrice) {
      params.set("max_price", debouncedMaxPrice);
    } else {
      params.delete("max_price");
    }

    params.delete("category[]");
    if (debouncedCategories && debouncedCategories.length > 0) {
      debouncedCategories.forEach((cat) => params.append("category[]", cat));
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [
    debouncedMinPrice,
    debouncedMaxPrice,
    debouncedCategories,
    pathname,
    router,
    searchParams,
  ]);

  useEffect(() => {
    trigger("minPrice");
    trigger("maxPrice");
  }, [trigger, maxPrice, minPrice]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="rounded-lg border border-neutral-4 w-60 px-4 lg:px-6 py-3 lg:py-4 space-y-2 shadow-md h-fit">
      <div className="flex items-center text-primary-1">
        <MdOutlineFilterAlt size={24} />
        <h3 className="text-xl font-semibold">Filter</h3>
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold">Kategori</h4>
        {categoriesData.length === 0 || isPending
          ? Array(3)
              .fill(0)
              .map((_, i) => <LoadingCategory key={`loading-category-${i}`} />)
          : categoriesData.map((category) => (
              <Checkbox
                key={`category-${category.id}`}
                id={`category-${category.id}`}
                label={category.name}
                value={category.id}
                name="category"
                register={register}
              />
            ))}
      </div>
      <div>
        <h4 className="font-semibold mb-1">Rentang Harga</h4>
        <div className="space-y-2">
          <TextInput
            id="minPrice"
            placeholder="Minimum"
            size="sm"
            register={register}
            type="number"
            error={errors.minPrice?.message}
            prefix="Rp"
            validation={{
              valueAsNumber: true,
              min: 0,
              validate: (value) => {
                const maxVal = watch("maxPrice");
                if (!maxVal) return true;
                if (value) {
                  return (
                    Number(value) <= Number(maxVal) ||
                    "Harga minimal harus lebih kecil dari maksimal"
                  );
                }
              },
            }}
          />
          <TextInput
            id="maxPrice"
            placeholder="Maksimum"
            size="sm"
            register={register}
            type="number"
            error={errors.maxPrice?.message}
            prefix="Rp"
            validation={{
              valueAsNumber: true,
              min: 0,
              validate: (value) => {
                const minVal = watch("minPrice");
                const minPrice = watch("minPrice");
                if (!minPrice) return true;
                if (value) {
                  return (
                    Number(value) >= Number(minVal) ||
                    "Harga maksimal hharus lebih besar dari minimum"
                  );
                }

                return true;
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LoadingCategory() {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        name="category"
        id="loading-1"
        className="mr-2 block w-3.5 h-3.5"
      />
      <SkeletonLoading height="16px" width="72px" />
    </div>
  );
}

export default function ProductFilter() {
  return (
    <Suspense>
      <Filter />
    </Suspense>
  );
}

"use client";

import ProductCard from "@/components/elements/ProductCard";
import {
  GetAllProductResponse,
  ProductData,
  ProductInterface,
} from "@/interface/product";
import { getAllProducts } from "@/service/product.service";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";
import TextInput from "@/components/elements/inputs/TextInput";
import { useForm } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";
import useDebounce from "@/hooks/useDebounce";

export default function ProductCardContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const page = parseInt(pageParam || "", 10);
  const limit = parseInt(limitParam || "", 10);
  const sort = searchParams.get("sort") || "";
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  const validPage = Number.isInteger(page) && page > 0 ? page : 1;
  const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
  const searchParamValue = searchParams.get("search") || "";

  const [products, setProducts] = useState<ProductData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { register } = useForm<{ search: string }>();

  const [search, setSearch] = useState<string>(searchParamValue);
  const debouncedSearch = useDebounce(search, 500);

  const setQueryParams = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      Object.keys(newParams).forEach((key) => {
        params.set(key, newParams[key]);
      });

      const newUrl = `?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams]
  );

  const categoryIDs = useMemo(() => {
    const categoryIDsParam = searchParams.getAll("category[]") || [];
    return categoryIDsParam.map((id) => Number(id));
  }, [searchParams]);

  const { mutate, isPending } = useMutation({
    mutationFn: getAllProducts,
    onSuccess: (response: GetAllProductResponse) => {
      const result = response.result;
      setProducts(
        result.products.map((product: ProductInterface) => ({
          id: product.ID,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image_url,
          stock: product.stock,
          weight: product.weight_per_unit,
          category: {
            ID: product.category.ID,
            name: product.category.name,
          },
        }))
      );
      setTotalPage(result.meta.total_page);
    },
  });

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    setQueryParams({ limit: newLimit });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setQueryParams({ sort: newSort });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setQueryParams({ search: newSearch });
    setSearch(newSearch);
  };

  useEffect(() => {
    mutate({
      page: validPage,
      limit: validLimit,
      search: debouncedSearch,
      categoryIDs,
      maxPrice: Number(maxPrice),
      minPrice: Number(minPrice),
      sort,
    });
  }, [
    validPage,
    validLimit,
    debouncedSearch,
    mutate,
    categoryIDs,
    maxPrice,
    minPrice,
    sort,
  ]);

  return (
    <div>
      <div className="rounded-lg border border-neutral-4 w-full px-4 lg:px-6 py-3 lg:py-4 shadow-md">
        <div className="mb-2">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextInput
              id="search"
              type="text"
              placeholder="Cari Produk"
              register={register}
              handleChange={handleSearchChange}
              size="sm"
              postFix={
                <div>
                  <IoMdSearch size={18} />
                </div>
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-6 mb-2 text-sm">
          <p>
            Showing{" "}
            <span className="font-semibold">
              {(validPage - 1) * validLimit + 1} -{" "}
              {validPage * validLimit + validLimit > products.length
                ? products.length
                : validPage * validLimit + validLimit}
            </span>{" "}
            of <span className="font-semibold">{products.length}</span>
          </p>
          <div className="">
            <label htmlFor="show-items">Show per page:</label>{" "}
            <select
              name="show-items"
              id="show-items"
              className="border border-neutral-4 text-xs rounded-md p-1 ml-1 mr-2"
              onChange={handleLimitChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>50</option>
            </select>
            <label htmlFor="sort-items">Sort by:</label>
            <select
              name="sort-items"
              id="sort-items"
              className="border border-neutral-4 rounded-md p-1 text-xs ml-1"
              onChange={handleSortChange}
            >
              <option value="asc">Terbaru</option>
              <option value="desc">Terlama</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCard
                  loading
                  id={i}
                  image=""
                  name=""
                  desc=""
                  weight={0}
                  stock={0}
                  price={0}
                  key={`loading-product-${i}`}
                />
              ))
            : products.map((product) => (
                <ProductCard
                  key={`product-${product.id}`}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  desc={product.description}
                  weight={product.weight}
                  stock={product.stock}
                  price={product.price}
                />
              ))}
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}

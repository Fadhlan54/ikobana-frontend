import ProductCardContainer from "./CardContainer";
import ProductFilter from "./filter";

export default function Products() {
  return (
    <div className="px-4 lg:px-8 py-4 flex gap-4">
      <ProductFilter />
      <div className="w-full">
        <ProductCardContainer />
      </div>
    </div>
  );
}

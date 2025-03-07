"use client";

import Dropdown from "@/components/shared/Dropdown";
import { priceOptions } from "@/constants/options";
import { useFilterStore } from "@/store/filterStore";

const PriceSelector = () => {
  const { price, setPrice } = useFilterStore();
  return <Dropdown label="재료 가격 " options={priceOptions} selectedValue={price} onSelect={setPrice} />;
};

export default PriceSelector;
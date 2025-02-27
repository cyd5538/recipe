"use client";

import Dropdown from "@/components/shared/Dropdown";
import { useFilterStore } from "@/store/filterStore";

const priceOptions = [
  { value: "10000", label: "10,000원" },
  { value: "20000", label: "20,000원" },
  { value: "50000", label: "50,000원" },
  { value: "100000", label: "100,000원" },
  { value: "200000", label: "기타" },
];

const PriceSelector = () => {
  const { price, setPrice } = useFilterStore();
  return <Dropdown label="재료 가격 " options={priceOptions} selectedValue={price} onSelect={setPrice} />;
};

export default PriceSelector;
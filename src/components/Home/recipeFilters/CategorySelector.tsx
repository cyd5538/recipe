"use client"

import { useFilterStore } from "@/store/filterStore";
import { categoryOptions } from "@/constants/options";
import Dropdown from "@/components/shared/Dropdown";



const CategorySelector = () => {
  const { category, setCategory } = useFilterStore();
  return <Dropdown label="카테고리" options={categoryOptions} selectedValue={category} onSelect={setCategory} variant="category" />;
};

export default CategorySelector;

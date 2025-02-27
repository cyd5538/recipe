"use client"

import { useFilterStore } from "@/store/filterStore";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaBowlRice, FaBreadSlice } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import { GiSushis } from "react-icons/gi";
import Dropdown from "@/components/shared/Dropdown";

const categoryOptions = [
  { value: "all", label: "All", icon: <AiOutlineGlobal /> },
  { value: "korean", label: "한식", icon: <FaBowlRice /> },
  { value: "chinese", label: "중식", icon: <ImFire /> },
  { value: "japanese", label: "일식", icon: <GiSushis /> },
  { value: "western", label: "양식", icon: <GiSushis /> },
  { value: "bakery", label: "베이커리", icon: <FaBreadSlice /> },
];

const CategorySelector = () => {
  const { category, setCategory } = useFilterStore();
  return <Dropdown label="카테고리" options={categoryOptions} selectedValue={category} onSelect={setCategory} variant="category" />;
};

export default CategorySelector;

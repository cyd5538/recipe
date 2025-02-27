"use client";

import React from "react";
import { useFilterStore } from "@/store/filterStore";
import Dropdown from "@/components/shared/Dropdown";

const timeOptions = [
  { value: "15", label: "15분" },
  { value: "30", label: "30분" },
  { value: "60", label: "1시간" },
  { value: "120", label: "2시간" },
  { value: "180", label: "2시간 이상" },
];

const TimeSelector = () => {
  const { time, setTime } = useFilterStore();

  return <Dropdown label="요리 시간" options={timeOptions} selectedValue={time} onSelect={setTime} />;
};

export default TimeSelector;

"use client";

import React from "react";
import { useFilterStore } from "@/store/filterStore";
import Dropdown from "@/components/shared/Dropdown";
import { timeOptions } from "@/constants/options";

const TimeSelector = () => {
  const { time, setTime } = useFilterStore();

  return <Dropdown label="요리 시간" options={timeOptions} selectedValue={time} onSelect={setTime} />;
};

export default TimeSelector;

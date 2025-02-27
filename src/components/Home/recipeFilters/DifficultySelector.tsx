"use client";

import Dropdown from '@/components/shared/Dropdown';
import { useFilterStore } from '@/store/filterStore';
import React from 'react'

const difficultyOptions = [
  { value: "하", label: "하" },
  { value: "중", label: "중" },
  { value: "상", label: "상" },
];

const DifficultySelector = () => {
  const { difficulty, setDifficulty } = useFilterStore();
  return <Dropdown label="난이도" options={difficultyOptions} selectedValue={difficulty} onSelect={setDifficulty} />;
}

export default DifficultySelector

"use client";

import Dropdown from '@/components/shared/Dropdown';
import { difficultyOptions } from '@/constants/options';
import { useFilterStore } from '@/store/filterStore';
import React from 'react'



const DifficultySelector = () => {
  const { difficulty, setDifficulty } = useFilterStore();
  return <Dropdown label="난이도" options={difficultyOptions} selectedValue={difficulty} onSelect={setDifficulty} />;
}

export default DifficultySelector

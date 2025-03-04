"use client";

import React from "react";
import { SelectCategory } from "@/components/write/SelectCategory";
import {
    recipeCategories,
    cookTimeCategories,
    difficultyCategories,
    materialPriceCategories,
  } from "@/constants/categories";

interface Props {
  selectedOptions: {
    category: string;
    cookTime: string;
    difficulty: string;
    materialPrice: string;
  };
  onChange: (key: keyof Props["selectedOptions"], value: string) => void;
}

export function SelectCategoryGroup({ selectedOptions, onChange }: Props) {
  return (
    <div className="my-4 flex gap-2">
      <SelectCategory
        categories={recipeCategories}
        onChange={(value) => onChange("category", value)}
        label="카테고리"
      />
      <SelectCategory
        categories={cookTimeCategories}
        onChange={(value) => onChange("cookTime", value)}
        label="요리 시간"
      />
      <SelectCategory
        categories={difficultyCategories}
        onChange={(value) => onChange("difficulty", value)}
        label="요리 난이도"
      />
      <SelectCategory
        categories={materialPriceCategories}
        onChange={(value) => onChange("materialPrice", value)}
        label="재료 가격"
      />
    </div>
  );
}

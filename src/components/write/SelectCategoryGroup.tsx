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
    <div>
      <h2 className="text-lg font-semibold my-4">🍖 요리 조건을 선택해주세요.</h2>
      <div className="my-4 flex gap-2">
        <SelectCategory
          selectedCategory={selectedOptions.category}
          categories={recipeCategories}
          onChange={(value) => onChange("category", value)}
          label="카테고리"
        />
        <SelectCategory
          selectedCategory={selectedOptions.cookTime}
          categories={cookTimeCategories}
          onChange={(value) => onChange("cookTime", value)}
          label="요리 시간"
        />
        <SelectCategory
          selectedCategory={selectedOptions.difficulty}
          categories={difficultyCategories}
          onChange={(value) => onChange("difficulty", value)}
          label="요리 난이도"
        />
        <SelectCategory
          selectedCategory={selectedOptions.materialPrice}
          categories={materialPriceCategories}
          onChange={(value) => onChange("materialPrice", value)}
          label="재료 가격"
        />
      </div>
    </div>
  );
}

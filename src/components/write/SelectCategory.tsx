"use client";

import * as React from "react";
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: { value: string; label: string }[];
  onChange?: (value: string) => void;
  label: string
  selectedCategory: string
}

export function SelectCategory({ categories, onChange, label, selectedCategory }: Props) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  
  useEffect(() => {
    setSelectedValue(selectedCategory)
  } ,[selectedCategory])

  return (
    <Select
      value={selectedValue ?? ""}
      onValueChange={(value) => {
        setSelectedValue(value);
        onChange?.(value);
      }}
    >
      <SelectTrigger >
        <SelectValue placeholder={label} /> 
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

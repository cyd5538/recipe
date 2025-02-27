"use client";

import { JSX, useState } from "react";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface DropdownProps<T extends { value: string; label: string; icon?: JSX.Element }> {
  label: string;
  options: T[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: "default" | "category";
}

const Dropdown = <T extends { value: string; label: string; icon?: JSX.Element }>({
  label,
  options,
  selectedValue,
  onSelect,
  variant = "default",
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOnClickOutside(() => setIsOpen(false));

  return (
    <div className={`relative w-full ${variant === "category" ? "custom-category-style" : ""}`} ref={dropdownRef}>
      <DropdownButton
        label={label}
        selectedValue={options.find((opt) => opt.value === selectedValue)?.label}
        onToggle={() => setIsOpen((prev) => !prev)}
        variant={variant} 
      />
      {isOpen && (
        <DropdownMenu
          options={options}
          selectedValue={selectedValue}
          onSelect={(value) => {
            onSelect(value);
            setIsOpen(false);
          }}
          variant={variant}
        />
      )}
    </div>
  );
};

export default Dropdown;

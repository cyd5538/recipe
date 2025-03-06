import React, { JSX } from "react";

interface DropdownMenuProps<T extends { value: string; label: string; icon?: JSX.Element }> {
  options: T[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: "default" | "category";
}

const DropdownMenu = <T extends { value: string; label: string; icon?: JSX.Element }>({
  options,
  selectedValue,
  onSelect,
  variant = "default",
}: DropdownMenuProps<T>) => {
  return (
    <ul
      className={`absolute left-0 w-full bpx-6 py-2 rounded-md border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black text-sm
        ${variant === "category" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 min-w-[50vh] md:min-w-[70vh] lg:min-w-[70vh] gap-2 p-2" : "flex flex-col items-center gap-2 p-2 "}
      `}
    >
      {options.map((option) => (
        <li
          key={option.value}
          className={`cursor-pointer w-full flex items-center justify-center gap-2 text-center py-4 rounded-md transition-all 
            ${selectedValue === option.value ? "bg-zinc-800 text-white dark:hover:bg-zinc-900" : "hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-900"}
          `}
          onClick={() => onSelect(option.value)}
        >
          {option.icon && <span>{option.icon}</span>}
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;

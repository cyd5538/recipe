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
      className={`absolute left-0 w-full rounded-xl border shadow-lg dark:bg-zinc-800 dark:text-white bg-white text-black text-sm
        transform transition-all duration-200 ease-in-out
        ${variant === "category" 
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 min-w-[50vh] md:min-w-[70vh] lg:min-w-[70vh] gap-2 p-4" 
          : "flex flex-col items-center gap-1 p-2"
        }
      `}
    >
      {options.map((option) => (
        <li
          key={option.value}
          className={`cursor-pointer w-full flex items-center justify-center gap-2 text-center py-3 rounded-xl text-base 
            transition-all duration-200 ease-in-out transform hover:scale-105
            ${selectedValue === option.value 
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md" 
              : "hover:bg-gradient-to-r hover:from-red-400 hover:to-red-500 hover:text-white dark:hover:bg-zinc-700"
            }
          `}
          onClick={() => onSelect(option.value)}
        >
          {option.icon && <span className="text-lg">{option.icon}</span>}
          <span className="font-medium">{option.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;

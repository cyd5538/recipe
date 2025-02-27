import React from "react";

interface DropdownButtonProps {
  label: string;
  selectedValue?: string;
  onToggle: () => void;
  variant?: "default" | "category";
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, selectedValue, onToggle, variant = "default" }) => {
  return (
    <button
      className={`w-full px-2 py-4 font-semibold sm:text-xl rounded-xl border-2 transition-all duration-200 shadow-md text-center bg-white border-gray-200 dark:bg-transparent dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white
      `}
      onClick={onToggle}
    >
      {selectedValue || label}
    </button>
  );
};

export default DropdownButton;

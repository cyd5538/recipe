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
      className={`w-full cursor-pointer bg-red-400 dark:bg-zinc-800 font-semibold mt-10 px-2 py-2 mb-4 sm:text-lg rounded-xl  transition-all duration-200 shadow-md text-center 
      `}
      onClick={onToggle}
    >
      {selectedValue || label}
    </button>
  );
};

export default DropdownButton;

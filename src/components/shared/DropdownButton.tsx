import React from "react";

interface DropdownButtonProps {
  label: string;
  selectedValue?: string;
  onToggle: () => void;
  variant?: "default" | "category";
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, selectedValue, onToggle, variant = "default" }) => {
  const baseStyles = "w-full cursor-pointer font-semibold px-4 py-3 rounded-xl transition-all duration-200 shadow-md text-center flex items-center justify-between";
  
  const variantStyles = {
    default: "bg-white dark:bg-zinc-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700",
    category: "bg-red-400 dark:bg-red-500 text-white hover:bg-red-500 dark:hover:bg-red-600"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} mt-8`}
      onClick={onToggle}
    >
      <span>{selectedValue || label}</span>
      <svg 
        className="w-5 h-5 ml-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export default DropdownButton;

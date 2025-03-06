import React from "react";
import CustomButton from "../ui/CustomButton";

interface DropdownButtonProps {
  label: string;
  selectedValue?: string;
  onToggle: () => void;
  variant?: "default" | "category";
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, selectedValue, onToggle, variant = "default" }) => {
  return (
    <CustomButton
      className={`w-full mt-10 px-2 py-2 mb-4 sm:text-lg rounded-xl  transition-all duration-200 shadow-md text-center 
      `}
      onClick={onToggle}
    >
      {selectedValue || label}
    </CustomButton>
  );
};

export default DropdownButton;

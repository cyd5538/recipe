import React from 'react';

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean
}

const CustomButton: React.FC<Props> = ({ 
  type = "button", 
  onClick, 
  children, 
  text, 
  className = "" ,
  disabled
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 w-full rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 ${className}`}
    >
      {children || text}
    </button>
  );
}

export default CustomButton;

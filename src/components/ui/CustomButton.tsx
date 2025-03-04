import React from 'react';

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  text?: string;
  icon?: React.ReactNode; 
  className?: string;
  disabled?: boolean
}

const CustomButton: React.FC<Props> = ({ 
  type = "button", 
  onClick, 
  children, 
  text, 
  className = "" ,
  disabled,
  icon
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-md border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 ${className}`}
    >
      {children || text} {icon}
    </button>
  );
}

export default CustomButton;

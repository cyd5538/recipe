import React from 'react';

interface Props {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  ref: React.RefObject<HTMLInputElement | null>
}

const Input: React.FC<Props> = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  onKeyDown,
  ref
  
}) => {
  return (
    <div className="flex justify-center items-center">
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`w-full p-3  dark:bg-zinc-800 dark:text-white  border-black bg-white text-black text-sm  transition duration-200  ${className}`}
      />
    </div>
  );
};

export default Input;

import React from 'react';

interface Props {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<Props> = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className="w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition ${className}`}
      />
    </div>
  );
};

export default Input;

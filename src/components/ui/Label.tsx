import React from 'react';

interface LabelProps {
    htmlFor?: string;
    text: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, text, size = 'md', className = "" }) => {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-lg',
    };
  
    return (
      <label htmlFor={htmlFor} className={`block font-medium ${sizeClasses[size]} ${className}`}>
        {text}
      </label>
    );
  };
  
  export default Label;
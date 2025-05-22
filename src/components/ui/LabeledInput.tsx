import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { useRef } from "react";

interface Props {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({ id, type, label, value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Input 
        ref={inputRef}
        type={type} 
        id={id} 
        value={value} 
        onChange={onChange} 
      />
    </div>
  );
};

export default LabeledInput;

import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";

interface Props {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({ id, type, label, value, onChange }: Props) => {
  return (
    <div>
      <Label htmlFor={id} text={label} className="mb-2" />
      <Input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default LabeledInput;

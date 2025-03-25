import React from "react";
import CustomButton from "../ui/CustomButton";

interface Props {
  inputTag: string;
  setInputTag: React.Dispatch<React.SetStateAction<string>>;
  handleAddTag: () => void;
  handleKeyDown: (event: React.KeyboardEvent) => void
  placeholder: string
}

const TagInput: React.FC<Props> = ({ inputTag, setInputTag, handleAddTag, handleKeyDown, placeholder }) => {
  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        value={inputTag}
        onChange={(e) => setInputTag(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <CustomButton
        onClick={handleAddTag}
        className="max-w-[100px] w-full px-4 py-2 rounded"
        text="추가"
      />
    </div>
  );
};

export default TagInput;

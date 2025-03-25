import React from "react";
import TagInput from "./TagInput";
import TagList from "./TagList";

interface Props {
  title: string;
  inputTag: string;
  setInputTag: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddTag: () => void;
  handleRemoveTag: (tagToRemove: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void
  placeholder: string;
}

const EditTagInput: React.FC<Props> = ({
  title,
  inputTag,
  setInputTag,
  tags,
  handleAddTag,
  handleRemoveTag,
  handleKeyDown,
  placeholder
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <TagInput handleKeyDown={handleKeyDown} inputTag={inputTag} setInputTag={setInputTag} handleAddTag={handleAddTag} placeholder={placeholder}/>
      <TagList tags={tags} handleRemoveTag={handleRemoveTag}/>
    </div>
  );
};

export default EditTagInput;

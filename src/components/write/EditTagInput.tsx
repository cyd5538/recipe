import React from "react";
import TagInput from "./TagInput";
import TagList from "./TagList";

interface Props {
  inputTag: string;
  setInputTag: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddTag: () => void;
  handleRemoveTag: (tagToRemove: string) => void;
}

const EditTagInput: React.FC<Props> = ({
  inputTag,
  setInputTag,
  tags,
  handleAddTag,
  handleRemoveTag
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">📝 태그 추가</h2>
      <TagInput inputTag={inputTag} setInputTag={setInputTag} handleAddTag={handleAddTag} />
      <TagList tags={tags} handleRemoveTag={handleRemoveTag}/>
    </div>
  );
};

export default EditTagInput;

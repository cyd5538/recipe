"use client";

import { Editor } from "@tiptap/core";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import CustomButton from "../ui/CustomButton";
import { PiYoutubeLogoDuotone } from "react-icons/pi";

interface Props {
  editor: Editor | null;
}

const EditorToolbar: React.FC<Props> = ({ editor }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const handleInsertYoutube = () => {
    const url = prompt("유튜브 동영상 URL을 입력하세요:");
    if (url) {
      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  return (
    <div className="mb-2 flex flex-wrap gap-2 border-b pb-2 h-14">
      <CustomButton
        onClick={() => editor?.chain().focus().toggleBold().run()}
        text="Bold"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        text="Italic"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        text="- List"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        text="1 List"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        text="H1"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        text="H2"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        text="H3"
      />
      <CustomButton
        onClick={() => editor?.chain().focus().setUnderline().run()}
        text="Underline"
      />

      {/* 이미지 업로드 버튼 */}
      <label className="flex justify-center items-center px-6 py-2 rounded-md border dark:bg-zinc-800 dark:text-white border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
        이미지
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      <CustomButton
        onClick={handleInsertYoutube}
        icon={<PiYoutubeLogoDuotone size={24}/>}
      />

      {/* 이모지 삽입 버튼 */}
      <div className="relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="h-full px-4 py-2 rounded-md border dark:bg-zinc-800 dark:text-white border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
        >
          😀
        </button>
        {showEmojiPicker && (
          <div className="absolute top-12 left-0">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                editor?.chain().focus().insertContent(emoji.emoji).run();
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;

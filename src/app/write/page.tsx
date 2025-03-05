"use client";

import React, { useState } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { redirect } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Header from "@/components/layout/header/Header";
import EditorToolbar from "@/components/write/EditorToolbar";
import EditTagInput from "@/components/write/EditTagInput";
import { WriteTitle } from "@/components/write/WriteTitle";
import { SelectCategoryGroup } from "@/components/write/SelectCategoryGroup";
import ThumbnailUpload from "@/components/write/ThumbnailUpload";
import CustomButton from "@/components/ui/CustomButton";

const RecipeEditor = () => {
  const { user, loading } = useAuthUser();
  const [title, setTitle] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    category: "",
    cookTime: "",
    difficulty: "",
    materialPrice: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Image,
      Youtube.configure({ width: 480, height: 270 }),
    ],
    editorProps: {
      attributes: { class: "prose focus:outline-none dark:text-white" },
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    redirect("/");
  }

  const handleCategoryChange = (
    key: keyof typeof selectedOptions,
    value: string
  ) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTag = () => {
    if (inputTag.trim() && !tags.includes(inputTag)) {
      setTags((prevTags) => [...prevTags, inputTag.trim()]);
      setInputTag("");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">🍽️ 나만의 요리 레시피를 적어주세요.</h1>
        <WriteTitle title={title} setTitle={setTitle} />
        <ThumbnailUpload thumbnail={thumbnail} setThumbnail={setThumbnail} />
        <SelectCategoryGroup
          selectedOptions={selectedOptions}
          onChange={handleCategoryChange}
        />
        <EditorToolbar editor={editor} />
        <div className="border rounded-md p-4 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
        <EditTagInput
          inputTag={inputTag}
          setInputTag={setInputTag}
          tags={tags}
          setTags={setTags}
          handleAddTag={handleAddTag}
        />
        <CustomButton text="레시피 등록"/>
      </main>
    </>
  );
};

export default RecipeEditor;

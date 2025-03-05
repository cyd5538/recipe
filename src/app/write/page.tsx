"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { redirect, useRouter } from "next/navigation";

import Header from "@/components/layout/header/Header";
import EditorToolbar from "@/components/write/EditorToolbar";
import EditTagInput from "@/components/write/EditTagInput";
import ThumbnailUpload from "@/components/write/ThumbnailUpload";
import CustomButton from "@/components/ui/CustomButton";
import { WriteTitle } from "@/components/write/WriteTitle";
import { SelectCategoryGroup } from "@/components/write/SelectCategoryGroup";

import { useRecipeEditor } from "@/hooks/useRecipeEditor";
import { toast } from "sonner";
import { insertRecipe, uploadThumbnail } from "@/lib/recipeService";
import { EditorContent } from "@tiptap/react";

const RecipeEditor = () => {
  const { user, loading } = useAuthUser();
  const router = useRouter();
  const {
    title,
    setTitle,
    selectedOptions,
    thumbnail,
    setThumbnail,
    handleCategoryChange,
    tags,
    setTags,
    handleRemoveTag,
    inputTag,
    setInputTag,
    editor,
    validateRecipeInput,
    handleAddTag
  } = useRecipeEditor();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    redirect("/");
  }

  // 레시피 제출 핸들러
  const handleRecipeSubmit = async () => {
    const validationError = validateRecipeInput();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const thumbnailUrl = thumbnail ? await uploadThumbnail(user.id, thumbnail) : null;

    const recipeData = {
      user_id: user.id,
      title: title.trim(),
      content: editor?.getHTML() || "",
      category: selectedOptions.category,
      cook_time: selectedOptions.cookTime,
      difficulty: selectedOptions.difficulty,
      material_price: selectedOptions.materialPrice,
      thumbnail_url: thumbnailUrl,
      tags: tags.length > 0 ? tags : null,
    };

    const result = await insertRecipe(recipeData);
    if (result) {
      toast.success("레시피가 성공적으로 등록되었습니다!");
      router.push("/");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <WriteTitle title={title} setTitle={setTitle} />
        <ThumbnailUpload thumbnail={thumbnail} setThumbnail={setThumbnail} />
        <SelectCategoryGroup selectedOptions={selectedOptions} onChange={handleCategoryChange} />
        <EditorToolbar editor={editor} />
        <div className="border rounded-md p-4 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
        <EditTagInput handleRemoveTag={handleRemoveTag} inputTag={inputTag} setInputTag={setInputTag} tags={tags} setTags={setTags} handleAddTag={handleAddTag} />
        <CustomButton text="레시피 등록" onClick={handleRecipeSubmit} className="h-16 w-full mt-12 mb-4" />
      </main>
    </>
  );
};

export default RecipeEditor;

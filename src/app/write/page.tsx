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
import RecipeSteps from "@/components/write/RecipeSteps";
import Loading from "@/components/ui/loading";

import { useRecipeEditor } from "@/hooks/useRecipeEditor";
import { toast } from "sonner";
import { insertRecipe, insertRecipeTags, insertTags, uploadStepImage, uploadThumbnail } from "@/lib/recipeService";
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
    handleRemoveTag,
    tags,
    setTags,
    inputTag,
    setInputTag,
    editor,
    validateRecipeInput,
    handleAddTag,
    handleKeyDown,
    ingredients,
    setIngredients,
    ingredientTag,
    setIngredientTag,
    handleAddIngredient,
    handleRemoveIngredient,
    handleIngredientKeyDown,
    steps,
    addStep,
    updateStepDescription,
    updateStepImage,
    removeStep,
  } = useRecipeEditor();

  if (loading) {
    return <Loading className="w-full h-screen flex justify-center items-center" />
  }

  if (!user) {
    redirect("/");
  }

  const handleRecipeSubmit = async () => {
    const validationError = validateRecipeInput();
    if (validationError) {
      toast.error(validationError);
      return;
    }
  
    const thumbnailUrl = thumbnail ? await uploadThumbnail(user.id, thumbnail) : null;
  
    const stepsWithImageUrls = await Promise.all(
      steps.map(async (step) => {
        const imageUrl = step.image ? await uploadStepImage(user.id, step.image) : null;
        return { description: step.description, image: imageUrl };
      })
    );
  
    const recipeData = {
      user_id: user.id,
      title: title.trim(),
      content: editor?.getHTML() || "",
      category: selectedOptions.category,
      cook_time: selectedOptions.cookTime,
      difficulty: selectedOptions.difficulty,
      material_price: selectedOptions.materialPrice,
      thumbnail_url: thumbnailUrl,
      ingredients,
      steps: stepsWithImageUrls,
    };
  
    const recipe = await insertRecipe(recipeData);
    if (!recipe || !recipe.id) {
      toast.error("레시피 저장 중 오류 발생!");
      return;
    }
  
    // 태그 저장 
    const tagIds = await insertTags(tags);
    await insertRecipeTags(recipe.id, tagIds);
  
    toast.success("레시피가 성공적으로 등록되었습니다!");
    router.push("/");
  };
  

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <WriteTitle title={title} setTitle={setTitle} />
        <ThumbnailUpload thumbnail={thumbnail} setThumbnail={setThumbnail} />
        <EditTagInput
          title={"🥘 요리에 들어가는 재료를 추가해주세요."}
          handleKeyDown={handleIngredientKeyDown}
          handleRemoveTag={handleRemoveIngredient}
          inputTag={ingredientTag}
          setInputTag={setIngredientTag}
          tags={ingredients}
          setTags={setIngredients}
          handleAddTag={handleAddIngredient}
          placeholder="예: 밥 1공기, 레몬2개, 고기400g"
        />
        <SelectCategoryGroup selectedOptions={selectedOptions} onChange={handleCategoryChange} />
        <EditorToolbar editor={editor} />
        <div className="mt-24 md:mt-4 sm:mt-8 border rounded-md p-4 min-h-[150px] w-full">
          <EditorContent editor={editor} />
        </div>
        <EditTagInput
          title={"🍕 요리에 달 태그를 달아주세요."}
          handleKeyDown={handleKeyDown}
          handleRemoveTag={handleRemoveTag}
          inputTag={inputTag}
          setInputTag={setInputTag}
          tags={tags}
          setTags={setTags}
          handleAddTag={handleAddTag}
          placeholder="예: 한식, 중식, 디저트 (태그는 5가지 이하로 작성해주세요)"
        />
        <RecipeSteps
          steps={steps}
          addStep={addStep}
          updateStepDescription={updateStepDescription}
          updateStepImage={updateStepImage}
          removeStep={removeStep}
        />
        <CustomButton text="레시피 등록" onClick={handleRecipeSubmit} className="h-16 w-full mt-12 mb-4" />
      </main>
    </>
  );
};

export default RecipeEditor;

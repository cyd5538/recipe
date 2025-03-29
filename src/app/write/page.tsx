"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";

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
import {
  insertRecipe,
  updateRecipe,
  insertRecipeTags,
  insertTags,
  uploadStepImage,
  uploadThumbnail,
  getRecipeById,
  deleteRecipeTags
} from "@/lib/recipeService";

import { EditorContent } from "@tiptap/react";

const RecipeEditor = () => {
  const { user, loading } = useAuthUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeId = searchParams.get("id");

  const {
    title,
    setTitle,
    selectedOptions,
    setSelectedOptions,
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
    setSteps,
    addStep,
    updateStepDescription,
    updateStepImage,
    removeStep,
  } = useRecipeEditor();

  const [loadingRecipe, setLoadingRecipe] = useState(false);

  useEffect(() => {
    if (recipeId) {
      const fetchRecipe = async () => {
        setLoadingRecipe(true);
        const recipe = await getRecipeById(recipeId);

        if (!recipe) {
          toast.error("레시피 데이터를 불러올 수 없습니다.");
          setLoadingRecipe(false);
          return;
        }

        setTitle(recipe.title);
        setSelectedOptions({
          category: recipe.category,
          cookTime: recipe.cook_time,
          difficulty: recipe.difficulty,
          materialPrice: recipe.material_price,
        });
        setThumbnail(recipe.thumbnail_url);
        setIngredients(recipe.ingredients);
        setSteps(
          recipe.steps.map((step) => ({
            description: step.description,
            image: step.image || ""
          }))
        );
        setTags(recipe.tags);

        if (editor) {
          editor.commands.setContent(recipe.content || "");
        }

        setLoadingRecipe(false);
      };

      fetchRecipe();

    }
  }, [recipeId, setTitle, setSelectedOptions, setThumbnail, setIngredients, setSteps, setTags, editor]);

  if (loading || loadingRecipe) {
    return <Loading className="w-full h-screen flex justify-center items-center" />;
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

    // 기존 썸네일 유지 (이미지 안바꾸면)
    let thumbnailUrl: string | null = typeof thumbnail === "string" ? thumbnail : null;
    if (thumbnail && typeof thumbnail !== "string") {
      thumbnailUrl = await uploadThumbnail(user.id, thumbnail);
    }

    // 기존 스텝 이미지 유지 (이미지 안바꾸면)
    const stepsWithImageUrls = await Promise.all(
      steps.map(async (step) => {
        let imageUrl: string | null = typeof step.image === "string" ? step.image : null;
        if (step.image && typeof step.image !== "string") {
          imageUrl = await uploadStepImage(user.id, step.image);
        }
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
      thumbnail_url: thumbnailUrl, // ✅ 기존 썸네일 유지
      ingredients,
      steps: stepsWithImageUrls, // ✅ 기존 스텝 이미지 유지
    };

    if (recipeId) {
      const updatedRecipe = await updateRecipe(recipeId, recipeData);
      if (!updatedRecipe) {
        toast.error("레시피 수정 중 오류 발생!");
        return;
      }

      await deleteRecipeTags(recipeId);
      await insertRecipeTags(recipeId, await insertTags(tags));
      toast.success("레시피가 성공적으로 수정되었습니다!");
    } else {
      const newRecipe = await insertRecipe(recipeData);
      if (!newRecipe || !newRecipe.id) {
        toast.error("레시피 저장 중 오류 발생!");
        return;
      }
      await insertRecipeTags(newRecipe.id, await insertTags(tags));
      toast.success("레시피가 성공적으로 등록되었습니다!");
    }

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
        <CustomButton text={recipeId ? "레시피 수정" : "레시피 등록"} onClick={handleRecipeSubmit} className="h-16 w-full mt-12 mb-4" />
      </main>
    </>
  );
};

export default RecipeEditor;

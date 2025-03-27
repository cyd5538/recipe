import { createClient } from "@/lib/client";
import { RecipeData } from "@/types/type";
import { toast } from "sonner";

const supabase = createClient();

// 썸네일 업로드 함수
export const uploadThumbnail = async (userId: string, thumbnail: File) => {
  try {
    const fileExt = thumbnail.name.split(".").pop()?.toLowerCase();
    const fileName = `${userId}/thumbnail_${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("recipe_thumbnails")
      .upload(fileName, thumbnail);

    if (uploadError) {
      console.error("Thumbnail Upload Error:", uploadError);
      toast.error("썸네일 업로드에 실패했습니다.");
      return null;
    }

    // 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
      .from("recipe_thumbnails")
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Unexpected Error:", error);
    toast.error("썸네일 업로드 중 오류가 발생했습니다.");
    return null;
  }
};

// 레시피 데이터 삽입 함수
export const insertRecipe = async (recipeData: RecipeData) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .insert(recipeData)
      .select("id")
      .single();

    if (error) {
      toast.error(`레시피 등록 중 오류: ${error.message}`);
      return null;
    }

    return data;
  } catch (err) {
    toast.error("레시피 등록 중 예기치 못한 오류가 발생했습니다.");
    return null;
  }
};

export const uploadStepImage = async (userId: string, image: File) => {
  try {
    const fileExt = image.name.split(".").pop()?.toLowerCase();
    const fileName = `steps/${userId}/recipe_step_${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("recipe-images") 
      .upload(fileName, image);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      toast.error("스텝 이미지 업로드에 실패했습니다.");
      return null;
    }

    // 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
      .from("recipe-images")
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Unexpected Error:', error);
    toast.error("스텝 이미지 업로드 중 오류가 발생했습니다.");
    return null;
  }
};

// tags 테이블에 젖아
export const insertTags = async (tags: string[]) => {

  return await Promise.all(
    tags.map(async (tag) => {
      const { data: existingTag, error: existingTagError } = await supabase
        .from("tags")
        .select("id")
        .eq("name", tag)
        .single();

      // PGRST116는 해당 태그가 존재하지 않는다는 발생하는 오류로 무시
      if (existingTagError && existingTagError.code !== "PGRST116") {
        console.error("태그 조회 오류:", existingTagError);
        return null;
      }

      if (existingTag) {
        return existingTag.id;
      }

      const { data: newTag, error: newTagError } = await supabase
        .from("tags")
        .insert({ name: tag })
        .select("id")
        .single();

      if (newTagError) {
        console.error("태그 삽입 오류:", newTagError);
        return null;
      }

      return newTag?.id;
    })
  );
};

// recipe_tags 테이블에 recipe_id와 tag_id를 연결
export const insertRecipeTags = async (recipeId: string, tagIds: (string | null)[]) => {

  await Promise.all(
    tagIds
      .filter((tagId) => tagId) 
      .map(async (tagId) => {
        await supabase.from("recipe_tags").insert({ recipe_id: recipeId, tag_id: tagId });
      })
  );
};
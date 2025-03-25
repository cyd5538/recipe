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
      .select();

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
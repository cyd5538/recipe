import axios from "axios";
import { createClient } from "@/lib/client";

export const askAiRecipe = async (prompt: string): Promise<string> => {
  const res = await axios.post("/api/ask-ai", { prompt }, {
    headers: { "Content-Type": "application/json" },
  });

  if (res.status !== 200) {
    throw new Error(`API 에러 ${res.status}`);
  }

  return res.data.result || "응답 없음";
};

export const saveAiRecipe = async (prompt: string, result: string, userId: string | undefined) => {
  if(!userId) {
    throw new Error("사용자 정보가 없습니다.");
  }

  const supabase = createClient();

  // 👇 AI 응답(result: string)을 JSON 객체로 변환
  let parsed;
  try {
    parsed = JSON.parse(result);
  } catch (err) {
    throw new Error("AI 응답이 올바른 JSON 형식이 아닙니다.");
  }

  // 테이블 구조에 맞게 필드 정리
  const payload = {
    title: parsed.title,
    category: parsed.category,
    cook_time: parsed.cook_time,
    difficulty: parsed.difficulty,
    material_price: parsed.material_price,
    ingredients: parsed.ingredients, 
    steps: parsed.steps,             
    tags: parsed.tags,              
    content: parsed.content,
    prompt: prompt,
    user_id: userId
  };

  const { data, error } = await supabase.from("ai_recipes").insert([payload]).select("id").single();

  if (error) throw new Error("레시피 저장 실패 --> " + error.message);
  
  return data;
};


export const getAiRecipeById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ai_recipes")
    .select("*") 
    .eq("id", id)
    .single();

  if (error) throw new Error("레시피 불러오기 실패 --> " + error.message);

  return data ?? null;
};

export const getAiRecipesByUserId = async (userId: string) => {
  if (!userId) {
    throw new Error("유저 정보가 없습니다.");
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("ai_recipes")
    .select("*") 
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); 

  if (error) {
    console.error("Error fetching AI recipes by user ID:", error);
    throw new Error("AI 생성 레시피 목록을 불러오는데 실패했습니다 --> " + error.message);
  }

  return data || []
};
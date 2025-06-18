import { createClient } from "@/lib/client";

const supabase = createClient();

async function getRecipeAuthorId(recipeId: string) {
  const { data, error } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();
  if (error || !data) throw new Error("레시피 정보를 찾을 수 없습니다.");
  return data.user_id as string;
}

/** 댓글 추가 + 알림 생성 */
export async function insertComment({
  recipeId,
  userId,
  content,
  parentId = null,
}: {
  recipeId: string;
  userId: string;
  content: string;
  parentId?: string | null;
}) {
  // 1) 댓글 저장
  const { error: insertErr } = await supabase.from("comments").insert([
    {
      recipe_id: recipeId,
      user_id: userId,
      parent_id: parentId,
      content,
    },
  ]);
  if (insertErr) throw new Error("댓글 작성 실패");

  // 2) 레시피 작성자에게 알림
  const recipeAuthorId = await getRecipeAuthorId(recipeId);
  console.log(recipeAuthorId, userId);
  if (recipeAuthorId !== userId) {
    await supabase.from("notifications").insert({
      user_id: recipeAuthorId,
      type: "comment",
      message: "새로운 댓글이 달렸습니다.",
    });
  }
}

/** 댓글 삭제(소유자 검증 포함) */
export async function removeComment({ commentId, userId }: { commentId: string; userId: string }) {
  const { data, error } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .single();
  if (error || !data) throw new Error("댓글이 존재하지 않습니다.");
  if (data.user_id !== userId) throw new Error("본인 댓글만 삭제 가능");

  const { error: delErr } = await supabase.from("comments").delete().eq("id", commentId);
  if (delErr) throw new Error("댓글 삭제 실패");
}

/** 댓글 수정(소유자 검증 포함) */
export async function updateComment({
  commentId,
  userId,
  newContent,
}: {
  commentId: string;
  userId: string;
  newContent: string;
}) {
  const { data, error } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .single();
  if (error || !data) throw new Error("댓글이 존재하지 않습니다.");
  if (data.user_id !== userId) throw new Error("본인 댓글만 수정 가능");

  const { error: updErr } = await supabase
    .from("comments")
    .update({ content: newContent })
    .eq("id", commentId);
  if (updErr) throw new Error("댓글 수정 실패");
}

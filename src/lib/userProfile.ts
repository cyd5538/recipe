import { createClient } from "@/lib/client";

export async function uploadAvatarFile(
  file: File,
  userId: string
): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    console.error("이미지 업로드 실패", uploadError);
    throw new Error("이미지 업로드 실패");
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function updateUserProfile(
  userId: string,
  nickname: string,
  avatarUrl?: string
) {
  const supabase = createClient();

  const { error: updateError } = await supabase
    .from("users")
    .update({
      nickname: nickname.trim(),
      avatar_url: avatarUrl,
    })
    .eq("id", userId);

  if (updateError) {
    if (updateError.code === "23505") {
      throw new Error("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.");
    } else {
      console.error("유저 업데이트 실패:", updateError);
      throw new Error("업데이트 실패");
    }
  }
}

import { createClient } from "@/lib/client";

const supabase = createClient();

export const checkIsFollowing = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();

  if (error) {
    console.error("팔로우 여부 확인 실패 -->", error.message);
    return { error: error.message };
  }

  return { data };
};

export const followUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase.from("follows").insert([
    { follower_id: followerId, following_id: followingId },
  ]);

  if (error) {
    console.error("팔로우 실패 -->", error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) {
    console.error("언팔로우 실패 -->", error.message);
    return { error: error.message };
  }

  return { success: true };
};

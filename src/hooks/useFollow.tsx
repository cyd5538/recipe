import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import { checkIsFollowing, followUser, unfollowUser } from "@/lib/follow";
import { toast } from "sonner";

export function useFollow(targetUserId: string) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkFollowStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await checkIsFollowing(user.id, targetUserId);
      if (!error && data) {
        setIsFollowing(true);
      }

      setLoading(false);
    };

    if (targetUserId) {
      checkFollowStatus();
    }
  }, [targetUserId]);

  const toggleFollow = async (): Promise<boolean | null> => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("로그인이 필요합니다.");
      setLoading(false);
      return null;
    }

    if (isFollowing) {
      const { error } = await unfollowUser(user.id, targetUserId);
      if (!error) {
        setIsFollowing(false);
        toast.success("언팔로우했습니다.");
      } else {
        console.error(`언팔로우 실패 --> : ${error}`);
      }
      setLoading(false);
      return false;
    } else {
      const { error } = await followUser(user.id, targetUserId);
      if (!error) {
        setIsFollowing(true);
        toast.success("팔로우했습니다!");
      } else {
        console.error(`팔로우 실패 --> : ${error}`);
      }
      setLoading(false);
      return true;
    }
  };

  return { isFollowing, toggleFollow, loading };
}

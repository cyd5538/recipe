"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useUserData } from "@/hooks/useUserData";
import CustomButton from "../ui/CustomButton";
import Loading from "../ui/loading";
import UserProfileAvatarUploader from "./UserProfileAvatarUploader";
import UserProfileNicknameInput from "./UserProfileNicknameInput";
import { UserProfileInfo } from "./UserProfileInfo";
import { updateUserProfile, uploadAvatarFile } from "@/lib/userProfile";

interface Props {
  userId: string | null;
}

const UserProfileEdit: React.FC<Props> = ({ userId }) => {
  const { userData, loading, error } = useUserData(userId);
  const [nickname, setNickname] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (userData?.nickname) setNickname(userData.nickname);
  }, [userData]);

  const handleSave = async () => {
    if (!nickname.trim()) {
      return toast.error("닉네임을 입력해주세요.");
    }

    const toastId = toast.loading("프로필 업데이트 중...");
    let avatarUrl = userData?.avatar_url;

    try {
      if (!userId) throw new Error("유저 정보가 없습니다.");

      if (avatarFile) {
        avatarUrl = await uploadAvatarFile(avatarFile, userId);
      }

      await updateUserProfile(userId, nickname, avatarUrl ?? undefined);
      toast.success("프로필이 업데이트되었습니다!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "업데이트 실패", { id: toastId });
    }
  };

  if (loading) return <div className="mt-36"><Loading /></div>;
  if (error) return <div className="text-red-500 text-center mt-12">{error}</div>;

  return (
    <motion.div
      className="max-w-md mx-auto mt-16 text-center space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <UserProfileAvatarUploader
        preview={preview ?? undefined}
        currentAvatar={userData?.avatar_url ?? undefined}
        onFileChange={(file) => {
          setAvatarFile(file);
          setPreview(URL.createObjectURL(file));
        }}
      />
      <UserProfileNicknameInput
        value={nickname}
        onChange={setNickname}
      />
      {userData?.email && userData?.created_at && (
        <UserProfileInfo
          email={userData.email}
          createdAt={userData.created_at}
        />
      )}
      <CustomButton onClick={handleSave} className="w-full">
        저장하기
      </CustomButton>
    </motion.div>
  );
};

export default UserProfileEdit;

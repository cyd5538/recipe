"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { toast } from "sonner";
import CustomButton from "@/components/ui/CustomButton";

const SetNicknamePage = () => {
  const supabase = createClient();
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("유저 정보를 가져올 수 없습니다.");
      setLoading(false);
      return;
    }

    // 닉네임 중복 확인
    const { data: existing, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname.trim());

    if (checkError) {
      toast.error("중복 확인 중 오류가 발생했습니다.");
      setLoading(false);
      return;
    }

    if (existing && existing.length > 0) {
      toast.error("이미 사용 중인 닉네임입니다.");
      setLoading(false);
      return;
    }

    // 닉네임 등록
    const { error } = await supabase
      .from("users")
      .update({ nickname: nickname.trim() })
      .eq("id", user.id);

    if (error) {
      toast.error("닉네임 설정 중 오류가 발생했습니다.");
    } else {
      toast.success("닉네임이 설정되었습니다!");
      router.replace("/");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">사용하실 닉네임을 설정해주세요.</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          className="w-full p-3 border rounded-md"
          disabled={loading}
        />
        <CustomButton
          type="submit"
          className="w-full p-3 bg-red-500 text-black rounded-md ransition"
          disabled={loading}
        >
          {loading ? "처리 중..." : "닉네임 설정"}
        </CustomButton>
      </form>
    </div>
  );
};

export default SetNicknamePage;

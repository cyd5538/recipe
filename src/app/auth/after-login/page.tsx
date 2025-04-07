"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import Loading from "@/components/ui/loading";

const AfterLoginPage = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkNickname = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: users, error } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();

      if (error || !users) {
        await supabase.from("users").insert({
          id: user.id,
          nickname: null, 
        });
        router.replace("/auth/set-nickname");
        return;
      }

      // 닉네임 없으면 닉네임 설정 페이지로
      if (!users.nickname) {
        router.replace("/auth/set-nickname");
      } else {
        router.replace("/");
      }
    };

    checkNickname();
  }, []);

  return <div className="w-full h-screen flex justify-center items-center"><Loading /></div>;
};

export default AfterLoginPage;

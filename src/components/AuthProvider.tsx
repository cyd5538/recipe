"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const supabase = createClient();

  const loadFullUser = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from("users")
      .select("nickname, avatar_url, created_at, full_name, is_active, last_sign_in, provider, email")
      .eq("id", userId)
      .single();

    if (error || !profile) {
      console.error("유저 정보 가져올때 에러", error);
      return;
    }

    setUser({
      id: userId,
      email: profile.email,
      nickname: profile.nickname,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      full_name: profile.full_name,
      is_active: profile.is_active,
      last_sign_in: profile.last_sign_in,
      provider: profile.provider,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;
      if (!error && user) {
        await loadFullUser(user.id); 
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user;
        if (user) {
          await loadFullUser(user.id); 
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}

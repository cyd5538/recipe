"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const supabase = createClient();
  // 사용자 ID를 추적하여 중복 요청 방지
  const loadedUserIdRef = useRef<string | null>(null);

  const loadFullUser = async (userId: string) => {
    // 이미 동일한 사용자 정보를 요청했다면 중복 요청 방지
    if (loadedUserIdRef.current === userId) {
      console.log("이미 로드된 사용자 정보입니다. 중복 요청을 방지합니다.", userId);
      return;
    }
    
    try {
      // 요청 전에 사용자 ID 기록
      loadedUserIdRef.current = userId;
      
      const { data: profile, error } = await supabase
        .from("users")
        .select("nickname, avatar_url, created_at, full_name, is_active, last_sign_in, provider, email")
        .eq("id", userId)
        .single();

      if (error || !profile) {
        console.error("유저 정보 가져올때 오류:", error);
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
    } catch (error) {
      console.error("사용자 정보 로드 중 오류:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (!isMounted) return;
        
        if (session?.user) {
          await loadFullUser(session.user.id);
        } else {
          setUser(null);
          loadedUserIdRef.current = null;
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
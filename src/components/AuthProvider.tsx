"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const supabase = createClient();
  
  console.log(user)
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user);
      }
    };

    fetchUser();

    // 로그인 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe(); 
    };
  }, [setUser]);

  return <>{children}</>;
}

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import { User } from "@supabase/supabase-js";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user);
      }
      setLoading(false);
    }

    fetchUser();

    // 로그인 상태 실시간 감지
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription?.unsubscribe(); 
    };
  }, []);

  return { user, loading };
}

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User } from "@/types/type";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (userData) {
          setUser(userData as User);
        }
      }
      setLoading(false);
    }

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser(userData as User || null);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return { user, loading };
}

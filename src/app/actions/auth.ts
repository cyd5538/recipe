'use server'

import { createClient } from '@/lib/server'
import { User } from '@/types/type'

const transformSupabaseUser = (supabaseUser: any): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    avatar_url: supabaseUser.user_metadata?.avatar_url || null,
    full_name: supabaseUser.user_metadata?.full_name || '',
    is_active: true,
    last_sign_in: supabaseUser.last_sign_in_at || new Date().toISOString(),
    provider: supabaseUser.app_metadata?.provider || 'email',
    nickname: supabaseUser.user_metadata?.nickname || null,
    created_at: supabaseUser.created_at
  };
};

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login Error:", error.message);

    if (error.message.includes("Invalid login credentials")) {
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }

    if (error.message.includes("User not found")) {
      return { success: false, message: "가입되지 않은 이메일입니다." };
    }

    return { 
      success: false, 
      message: "로그인 중 에러가 발생하였습니다. 잠시 후 다시 시도해주세요." 
    };
  }

  if (!data.user) {
    return { 
      success: false, 
      message: "로그인에 실패하였습니다. 다시 시도해주세요." 
    };
  }

  const transformedUser = transformSupabaseUser(data.user);
  return { success: true, message: "로그인 완료!", user: transformedUser };
}

export const signup = async (email: string, password: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  // 이미 사용중인 유저라면
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { 
      success: false, 
      message: "이미 사용중인 이메일입니다. 로그인을 시도해주세요." 
    };
  }

  if (data.user) {
    return { success: true, message: "회원가입 성공!" };
  }

  return { success: false, message: "회원가입 중 발생했습니다. 잠시 후 다시 시도해주세요." };
};
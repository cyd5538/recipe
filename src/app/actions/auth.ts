'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
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
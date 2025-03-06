"use client"

import React from 'react'
import { createClient } from "@/lib/client";
import CustomButton from '../ui/CustomButton';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

interface props {
  text: string;
}

const GoogleAuth:React.FC<props> = ({text}) => {
    const supabase = createClient();
    const handleGoogleLogin = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    
      if (error) {
        toast.error("Google 로그인 실패");
        console.error("Google 로그인 오류:", error);
      }
    };
    
    return (
      <CustomButton text={text} onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 bg-white border p-3 rounded-md shadow-sm hover:bg-gray-100 transition">
        <FcGoogle size={20} /> Google {text}
      </CustomButton>
    );
    
}

export default GoogleAuth
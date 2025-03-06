"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/CustomButton";
import { login } from "@/app/actions/auth";
import { toast } from "sonner";
import LabeledInput from "../ui/LabeledInput";
import GoogleAuth from "../shared/GoogleAuth";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("로그인 중...");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        console.log(result)
        toast.error(result.message, { id: toastId });
        return;
      }

      toast.success("로그인 완료되었습니다.", { id: toastId });
      router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      toast.error("로그인 실패", { id: toastId });
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full ">
      <LabeledInput id="email" type="email" label="이메일" value={formData.email} onChange={handleChange} />
      <LabeledInput id="password" type="password" label="비밀번호" value={formData.password} onChange={handleChange} />
      <CustomButton type="submit" disabled={loading} className="w-full">
        {loading ? "로그인 중..." : "로그인"}
      </CustomButton>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t"></div>
        <span className="px-3 text-gray-500">또는</span>
        <div className="flex-grow border-t"></div>
      </div>

      <GoogleAuth text="로그인"/>
    </form>
  );
};


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/CustomButton";
import { signup } from "@/app/actions/auth";
import { toast } from "sonner";
import LabeledInput from "../ui/LabeledInput";
import GoogleAuth from "../shared/GoogleAuth";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }

    const toastId = toast.loading("회원가입 진행 중...");
    setLoading(true);

    try {
      const result = await signup(formData.email, formData.password);

      if (!result.success) {
        console.log(result)
        toast.error(result.message, { id: toastId });
        return;
      }

      toast.success("회원가입이 완료되었습니다.", { id: toastId });
      router.push("/");
    } catch (error) {
      console.error("회원가입 오류:", error);
      toast.error("회원가입 실패", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <LabeledInput id="email" type="email" label="이메일" value={formData.email} onChange={handleChange} />
      <LabeledInput id="password" type="password" label="비밀번호" value={formData.password} onChange={handleChange} />
      <LabeledInput id="passwordConfirm" type="password" label="비밀번호 확인" value={formData.passwordConfirm} onChange={handleChange} />

      <CustomButton type="submit" disabled={loading} className="w-full">
        {loading ? "가입 중..." : "회원가입"}
      </CustomButton>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t"></div>
        <span className="px-3 text-gray-500">또는</span>
        <div className="flex-grow border-t"></div>
      </div>

      <GoogleAuth text="회원가입"/>
    </form>
  );
};


"use client";

import Logo from "@/components/layout/header/Logo";
import { SignUpForm } from "@/components/signup/SignUpForm";
import { useAuthUser } from "@/hooks/useAuthUser";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const { user, loading } = useAuthUser();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if(user) {
    redirect("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white sm:bg-gray-100">
      <div className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-none sm:shadow-md">
        <div className="my-4">
          <Logo />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;

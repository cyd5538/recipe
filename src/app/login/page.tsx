"use client";

import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import CustomButton from '@/components/ui/CustomButton';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation'
import Logo from '@/components/layout/header/Logo';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGoogleLogin = () => {

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white sm:bg-gray-100">
      <div className="w-full sm:max-w-md bg-white  p-8 rounded-lg shadow-none sm:shadow-md">
        <div className='my-4'>
          <Logo />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor='email' text="이메일" className='mb-2' />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
          </div>
          <div>
            <Label htmlFor='password' text="비밀번호" className='mb-2' />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
          </div>
          <CustomButton type="submit">
            로그인
          </CustomButton>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="px-3 text-gray-500">또는</span>
          <div className="flex-grow border-t"></div>
        </div>
        <CustomButton
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border p-3 rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          <FcGoogle size={20} /> Google 로그인
        </CustomButton>
        <p className="text-center text-sm text-gray-600 mt-4">
          계정이 없으신가요?{' '}
          <span
            className="text-gray-400 cursor-pointer underline"
            onClick={() => router.push('/signup')}
          >
            회원가입하기
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

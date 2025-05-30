"use client";

import React from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { navItems } from '@/constants/navItems'
import { createClient } from '@/lib/client';
import { toast } from 'sonner';

const Header = () => {
  const { user } = useAuthStore();

  const filteredItems = navItems.filter((item) => {
    if (item.authRequired === "all") return true;
    if (item.authRequired) return !!user;
    return !user;
  });

  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("로그아웃 하였습니다.");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
        <Logo />

        {/* 우측 메뉴 영역 */}
        <div className="flex items-center gap-4">
          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex items-center gap-6">
            {filteredItems.map((item) => {
              if (item.text === "로그아웃") {
                return (
                  <button
                    key="logout"
                    onClick={handleLogout}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-[15px] transition-colors"
                  >
                    로그아웃
                  </button>
                );
              }

              if (!item.href) return null;

              const href = item.dynamic && user ? `${item.href}?id=${user.id}` : item.href;

              return (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-[15px] transition-colors"
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>


          {/* 테마 토글과 모바일 메뉴 */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="lg:hidden">
              <NavBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

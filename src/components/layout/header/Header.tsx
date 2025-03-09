"use client";

import React from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import ThemeToggle from './ThemeToggle'
import Separator from './Separator'
import UserActions from './UserAction';
import MobileNavBar from '../mobileheader/MobileNavBar';

const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 border-b shadow-sm transition-colors">
      <div className='container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between'>
        <Logo />
        {/* 웹 뷰 */}
        <nav className="items-`center gap-4 hidden sm:flex">
          <NavBar />
          <ThemeToggle />
          <Separator />
          <UserActions />
        </nav>
        {/* 모바일 뷰 */}
        <nav className='flex sm:hidden absolute right-4'>
          <MobileNavBar />
        </nav>
      </div>
    </header>
  )
}

export default Header

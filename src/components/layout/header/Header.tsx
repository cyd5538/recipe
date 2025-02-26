import React from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import ThemeToggle from './ThemeToggle'
import AuthButtons from './AuthButtons'
import Separator from './Separator'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 border-b shadow-sm transition-colors">
      <div className='container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between'>
        <Logo />
      <nav className="flex items-center gap-4">
        <NavBar />
        <ThemeToggle />
        <Separator />
        <AuthButtons />
      </nav>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import AuthButtonItem from './AuthButtonItem';
import { authItems } from '@/constants/navItems';

const AuthButtons = () => {

  return (
    <div className='hidden md:flex items-center gap-4'>
      {authItems.map((item, index) => (
        <AuthButtonItem key={index} href={item.href} text={item.text} />
      ))}
    </div>
  )
}

export default AuthButtons

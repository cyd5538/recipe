import React from 'react'
import AuthButtonItem from './AuthButtonItem';

const AuthButtons = () => {
  const authtems = [
    { href: "/login", text: "로그인" },
    { href: "/signup", text: "회원가입" },
  ];
  
  return (
    <div className='hidden md:flex items-center gap-4'>
      {authtems.map((item, index) => (
          <AuthButtonItem key={index} href={item.href} text={item.text}/>
        ))}
    </div>
  )
}

export default AuthButtons

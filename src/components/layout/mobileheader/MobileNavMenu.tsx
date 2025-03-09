"use client"

import React from "react";
import { navItems } from "@/constants/navItems";
import { MobileAuthMenu } from "./MobileAuthMenu";
import MobileNavMenuList from "./MobileNavMenuList";


export const MobileNavMenu = () => {
  return (
    <ul className="flex flex-col gap-2 mt-20 p-4">
      {navItems.map((item, index) => (
        <MobileNavMenuList key={index} href={item.href} text={item.text}/>
      ))}

      {/* 로그인, 회원가입, 로그아웃 버튼 */}
      <MobileAuthMenu />
    </ul>
  );
};

"use client";

import { useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { MobileMenuBtn } from "./MobileMenuBtn";
import { MobileCloseBtn } from "./MobileCloseBtn";
import { MobileNavMenu } from "./MobileNavMenu";
import ThemeToggle from "../header/ThemeToggle";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useOnClickOutside(() => setIsOpen(false));

  return (
    <div className="relative">
      {/* 햄버거 버튼 */}
      <MobileMenuBtn setIsOpen={setIsOpen} />

      {/* 사이드바 */}
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-black/50">
          <nav
            ref={navRef}
            className="fixed top-0 z-20 right-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-lg transition-transform transform"
          >
            {/* 닫기 버튼 */}
            <MobileCloseBtn setIsOpen={setIsOpen} />

            {/* 네비게이션 메뉴 */}
            <MobileNavMenu />
            <div className="absolute bottom-12 right-2">
              <ThemeToggle />
            </div>
          </nav>
          {/* theme toggle */}
        </div>
      )}

    </div>
  );
};

export default MobileNavBar;

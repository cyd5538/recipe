import { navItems } from "@/constants/navItems";
import { createClient } from "@/lib/client";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

interface MenuListProps {
  onClose: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ onClose }) => {
  const { user } = useAuthStore();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("로그아웃 하였습니다.");
      onClose();
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  const filteredItems = navItems.filter((item) => {
    if (item.authRequired === "all") return true; 
    if (item.authRequired) return !!user; 
    return !user; 
  });

  return (
    <ul className="flex flex-col gap-4 text-lg">
      {filteredItems.map((item) => {
        // 로그아웃 버튼만
        if (!item.href) {
          return (
            <li
              key={item.text} 
              className="cursor-pointer hover:bg-red-500 px-2 py-2 rounded-lg hover:text-white"
              onClick={handleLogout}
            >
              {item.text}
            </li>
          );
        }

        // mypage일 경우 id 추가
        const href = item.dynamic && user ? `${item.href}?id=${user.id}` : item.href;

        return (
          <li
            key={href}
            className="cursor-pointer hover:bg-red-400 px-2 py-2 rounded-lg hover:text-white"
            onClick={onClose}
          >
            <Link href={href} className="block w-full h-full">{item.text}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;

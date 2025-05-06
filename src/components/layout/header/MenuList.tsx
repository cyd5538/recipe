import { navItems } from "@/constants/navItems";
import { createClient } from "@/lib/client";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Home, User, LogOut, BookOpen, PlusCircle, Sparkles, Search, PenSquare } from "lucide-react";

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

  const getIcon = (text: string) => {
    switch (text) {
      case "홈":
        return <Home className="w-5 h-5" />;
      case "마이 페이지":
        return <User className="w-5 h-5" />;
      case "글 쓰기":
        return <PenSquare className="w-5 h-5" />;
      case "로그아웃":
        return <LogOut className="w-5 h-5" />;
      case "AI 레시피":
        return <Sparkles className="w-5 h-5" />;
      case "검색":
        return <Search className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const filteredItems = navItems.filter((item) => {
    if (item.authRequired === "all") return true;
    if (item.authRequired) return !!user;
    return !user;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <ul className="flex flex-col">
          {filteredItems.map((item) => {
            if (!item.href) {
              return (
                <li
                  key={item.text}
                  className="group cursor-pointer transition-all duration-200"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-3 px-4 py-3.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                    {getIcon(item.text)}
                    <span className="font-medium">{item.text}</span>
                  </div>
                </li>
              );
            }

            const href = item.dynamic && user ? `${item.href}?id=${user.id}` : item.href;

            return (
              <li
                key={href}
                className="group cursor-pointer transition-all duration-200"
                onClick={onClose}
              >
                <Link href={href} className="block">
                  <div className="flex items-center gap-3 px-4 py-3.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                    {getIcon(item.text)}
                    <span className="font-medium">{item.text}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuList;

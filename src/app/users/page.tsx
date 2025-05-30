"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { motion } from "framer-motion";
import UserTabs from "@/components/users/UserTabs";
import UserRecipes from "@/components/users/UserRecipes";
import { useAuthStore } from "@/store/authStore";
import UserTabContent from "@/components/users/UserTabContent";

const UserPage: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { user } = useAuthStore();

  const isMyPage = useMemo(() => {
    if (!user || !userId) return false;
    return user.id.toString() === userId;
  }, [user, userId]);

  const [activeTab, setActiveTab] = useState<
    "profile" | "my-posts" | "favorites" | "likes" | "ai-posts"
  >("profile");

  // userId가 없으면 잘못된 접근 처리
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <p className="text-center text-red-500">잘못된 접근입니다. URL에 유저 ID가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold my-4">
          {isMyPage ? "My Page" : ""}
        </h1>

        {isMyPage ? (
          <>
            <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <UserTabContent activeTab={activeTab} userId={userId} />
              </motion.div>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <UserRecipes userId={userId} isMyPage={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;

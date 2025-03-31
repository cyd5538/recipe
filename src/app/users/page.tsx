"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { motion } from "framer-motion";
import UserTabs from "@/components/users/UserTabs";
import UserProfile from "@/components/users/UserProfile";
import UserRecipes from "@/components/users/UserRecipes";

const UserPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [activeTab, setActiveTab] = useState<"profile" | "my-posts" | "favorites">("profile");

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold my-4">My Page</h1>
        {/* 탭 버튼 */}
        <UserTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        {/* 탭 콘텐츠 */}
        <div className="mt-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "profile" && <UserProfile userId={userId}/>}
            {activeTab === "my-posts" && <UserRecipes userId={userId}/>}
            {activeTab === "favorites" && <Favorites />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
const Favorites = () => <div> 즐겨찾기한 글</div>;
import React from 'react'
import { motion } from "framer-motion";

interface Prop {
  activeTab: "profile" | "my-posts" | "favorites" | "likes" | "ai-posts"
  setActiveTab: React.Dispatch<React.SetStateAction<"profile" | "my-posts" | "favorites" | "likes" | "ai-posts">>
  tab: {
    id: "profile" | "my-posts" | "favorites" | "likes" | "ai-posts";
    label: string;
  }
}

const UserTab:React.FC<Prop> = ({activeTab, setActiveTab, tab}) => {
  return (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`relative py-3 text-center font-medium transition ${activeTab === tab.id ? "text-red-500" : "text-gray-500"
        }`}
    >
      {tab.label}
      {activeTab === tab.id && (
        <motion.div
          layoutId="underline"
          className="absolute left-0 bottom-0 h-1 bg-red-500 dark:bg-white"
          style={{
            width: `${tab.label.length * 0.8}rem`, // label 길이에 비례하여 width 설정
            left: `calc(50% - ${tab.label.length * 0.4}rem)`, // 가운데 정렬
          }}
        />
      )}
    </button>
  )
}

export default UserTab

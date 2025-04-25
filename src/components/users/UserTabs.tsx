import React from 'react'
import { userTabs } from "@/constants/mypage";
import UserTab from './UserTab';

interface Prop {
  activeTab: "profile" | "my-posts" | "favorites" | "likes"
  setActiveTab: React.Dispatch<React.SetStateAction<"profile" | "my-posts" | "favorites" | "likes">>
}

const UserTabs:React.FC<Prop> = ({activeTab, setActiveTab}) => {
  return (
    <div className="flex gap-6 justify-start border-b">
      {userTabs.map((tab) => (
        <UserTab key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab}/>
      ))}
    </div>
  )
}

export default UserTabs

import React from "react";
import UserProfileEdit from "./UserProfileEdit";
import UserRecipes from "./UserRecipes";
import UserFavorite from "./UserFavorite";
import UserLike from "./UserLike";
import UserAiPosts from "./UserAiPosts";

interface Props {
  activeTab: "profile" | "my-posts" | "favorites" | "likes" | "ai-posts";
  userId: string | null;
}

const UserTabContent: React.FC<Props> = ({ activeTab, userId }) => {
  const tabComponentMap = {
    profile: <UserProfileEdit userId={userId} />,
    "my-posts": <UserRecipes userId={userId} isMyPage={true} />,
    favorites: <UserFavorite userId={userId} />,
    likes: <UserLike userId={userId} />,
    "ai-posts": <UserAiPosts userId={userId} />,
  };

  return tabComponentMap[activeTab] ?? null;
};

export default UserTabContent;

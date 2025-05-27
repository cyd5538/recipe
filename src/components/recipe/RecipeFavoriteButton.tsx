"use client";

import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import FavoriteFolderModal from "./FavoriteFolderModal";
import { useRecipeFavorite } from "@/hooks/useRecipeFavorite";

interface Props {
  recipeId: string;
}



const RecipeFavoriteButton: React.FC<Props> = ({ recipeId }) => {
  const {
    isModalOpen,
    folders,
    loading,
    setIsModalOpen,
    toggleFavorite,
    handleFolderSelect,
  } = useRecipeFavorite({ recipeId });

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleFavorite}
        disabled={loading}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
          bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-zinc-700"
      >
        <motion.div
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaRegHeart className="text-gray-400 dark:text-gray-500 group-hover:text-red-400 dark:group-hover:text-red-400" />
        </motion.div>
        <span className="font-medium">
          즐겨찾기
        </span>
      </motion.button>

      <FavoriteFolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        folders={folders}
        onSelect={async (folder) => {
          try {
            await handleFolderSelect(folder.id);
            setIsModalOpen(false);
          } catch (error) {
            console.error('폴더 선택 중 오류:', error);
          }
        }}
        loading={loading}
      />
    </>
  );
};

export default RecipeFavoriteButton;

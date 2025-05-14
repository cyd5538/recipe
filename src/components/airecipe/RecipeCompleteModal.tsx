import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, X } from "lucide-react";
import ModalButton from "../ui/ModalButton";

interface RecipeCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewRecipe: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export default function RecipeCompleteModal({ isOpen, onClose, onViewRecipe }: RecipeCompleteModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-zinc-800 rounded-xl p-8 max-w-sm w-full mx-4 relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="inline-block p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <ChefHat className="w-8 h-8 text-red-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              레시피가 완성되었어요!
            </h3>
            
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              AI 요리사가 특별한 레시피를 만들었어요. 지금 바로 확인해보세요!
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ModalButton onClick={onViewRecipe} variant="primary">
                레시피 보기
              </ModalButton>
              <ModalButton onClick={onClose} variant="secondary">
                닫기
              </ModalButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 
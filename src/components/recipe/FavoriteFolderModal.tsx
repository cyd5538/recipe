import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FolderPlus } from "lucide-react";
import { FolderList } from "./recipe_favorite/FolderList";
import { CreateFolderForm } from "./recipe_favorite/CreateFolderForm";
import { ModalActions } from "./recipe_favorite/ModalActions";
import { Folder, FolderRecipe } from "@/types/type";

interface FavoriteFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (folder: Folder) => void;
  folders: (Omit<Folder, 'recipes'> & { recipes?: FolderRecipe[] })[];
  loading: boolean;
}

const FavoriteFolderModal: React.FC<FavoriteFolderModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  folders,
  loading,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState<boolean>(false);

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  const handleCreateFolder = async (folderName: string) => {
    await onSelect(folders.find(f => f.name === folderName) as Folder);
    setIsCreatingFolder(false);
  };

  const handleConfirm = async () => {
    if (selectedFolder) {
      await onSelect(folders.find(f => f.id === selectedFolder) as Folder);
    }
  };

  const normalizedFolders = folders.map(f => ({ ...f, recipes: f.recipes ?? [] }));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-[420px] shadow-2xl border border-gray-100 dark:border-zinc-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">즐겨찾기</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                레시피를 저장할 폴더를 선택하세요
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {isCreatingFolder ? (
            <CreateFolderForm
              onSubmit={handleCreateFolder}
              onCancel={() => setIsCreatingFolder(false)}
              loading={loading}
            />
          ) : (
            <>
              <FolderList
                folders={normalizedFolders}
                selectedFolder={selectedFolder}
                onSelect={handleFolderSelect}
              />
              <button
                onClick={() => setIsCreatingFolder(true)}
                className="w-full flex items-center justify-center gap-2 p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-dashed border-gray-200 dark:border-zinc-700 mb-4"
              >
                <FolderPlus size={18} />
                <span className="font-medium">새 폴더 만들기</span>
              </button>
              <ModalActions
                onClose={onClose}
                onConfirm={handleConfirm}
                disabled={!selectedFolder}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FavoriteFolderModal;

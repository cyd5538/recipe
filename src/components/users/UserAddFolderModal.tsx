import React, { useState } from 'react';
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
  loading: boolean;
}

const UserAddFolderModal: React.FC<Props> = ({ isOpen, onClose, onAdd, loading }) => {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      await onAdd(folderName.trim());
      setFolderName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">새 폴더 만들기</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none"
            autoFocus
            disabled={loading}
          />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!folderName.trim() || loading}
              className="px-4 py-2 bg-red-500 dark:bg-purple-950 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[80px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                '만들기'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserAddFolderModal; 
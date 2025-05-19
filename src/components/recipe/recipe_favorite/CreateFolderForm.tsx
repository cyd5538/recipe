import { useState } from "react";
import { Plus } from "lucide-react";

interface Props {
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export const CreateFolderForm: React.FC<Props> = ({ onSubmit, onCancel, loading }) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleSubmit = async () => {
    if (newFolderName.trim()) {
      await onSubmit(newFolderName.trim());
      setNewFolderName("");
    }
  };

  return (
    <div className="border-t pt-4 dark:border-zinc-800">
      <div className="flex gap-2">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="새 폴더 이름"
          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
          autoFocus
          disabled={loading}
        />
        <button
          onClick={onCancel}
          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          disabled={loading}
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={!newFolderName.trim() || loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus size={18} />
          )}
        </button>
      </div>
    </div>
  );
};
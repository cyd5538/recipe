import React from 'react';
import { Plus } from 'lucide-react';
import { Folder } from '@/types/type';

interface FolderTabsProps {
  folders: Folder[];
  selectedFolder: Folder | null;
  onSelectFolder: (folder: Folder) => void;
  onAddFolder: () => void;
}

const FolderTabs: React.FC<FolderTabsProps> = ({
  folders,
  selectedFolder,
  onSelectFolder,
  onAddFolder,
}) => {
  return (
    <div className="flex items-center justify-between pb-4 mb-6 border-b">
      <div className="flex space-x-2 overflow-x-auto">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onSelectFolder(folder)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${selectedFolder?.id === folder.id
                ? 'bg-red-500 dark:bg-purple-950 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-purple-950'
              }`}
          >
            {folder.name} ({folder.count})
          </button>
        ))}
      </div>
      <button
        onClick={onAddFolder}
        className="ml-4 p-2 rounded-lg bg-primary text-white  bg-red-500 dark:bg-purple-950 transition-colors flex items-center space-x-1"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">새 폴더</span>
      </button>
    </div>
  );
};

export default FolderTabs; 
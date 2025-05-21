import React from 'react';
import { Plus, MoreVertical, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Folder } from '@/types/type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FolderTabsProps {
  folders: Folder[];
  selectedFolder: Folder | null;
  onSelectFolder: (folder: Folder) => void;
  onAddFolder: () => void;
  onRenameFolder?: (folderId: string) => void;
  onDeleteFolder?: (folderId: string) => void;
  isDeleting?: string | null;
  isRenaming?: string | null;
}

const FolderTabs: React.FC<FolderTabsProps> = ({
  folders,
  selectedFolder,
  onSelectFolder,
  onAddFolder,
  onRenameFolder,
  onDeleteFolder,
  isDeleting,
  isRenaming,
}) => {
  return (
    <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200 dark:border-zinc-700">
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex space-x-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="relative group hover:scale-[1.02] transition-transform duration-200 flex-shrink-0"
            >
              <div
                className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer
                  ${selectedFolder?.id === folder.id
                    ? 'bg-red-500 dark:bg-purple-950 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-zinc-800/50 dark:text-gray-200 dark:hover:bg-zinc-800'
                  }`}
                onClick={() => onSelectFolder(folder)}
              >
                <span className="relative">
                  {folder.name}
                  <span className="ml-1.5 text-xs opacity-80">({folder.count})</span>
                  {selectedFolder?.id === folder.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white dark:bg-white/90 transition-all duration-200" />
                  )}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className="h-7 w-7 -mr-1 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isDeleting === folder.id || isRenaming === folder.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoreVertical className="h-4 w-4" />
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    {onRenameFolder && (
                      <DropdownMenuItem
                        onClick={() => onRenameFolder(folder.id)}
                        className="flex items-center gap-2 text-sm py-2"
                        disabled={isRenaming === folder.id}
                      >
                        {isRenaming === folder.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Pencil className="h-4 w-4" />
                        )}
                        <span>이름 변경</span>
                      </DropdownMenuItem>
                    )}
                    {onDeleteFolder && (
                      <DropdownMenuItem
                        onClick={() => onDeleteFolder(folder.id)}
                        className="flex items-center gap-2 text-sm py-2 text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50"
                        disabled={isDeleting === folder.id}
                      >
                        {isDeleting === folder.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span>삭제</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={onAddFolder}
        className="px-3 py-2 h-9 rounded-lg bg-red-500 dark:bg-purple-950 text-white transition-all duration-200 flex items-center space-x-1.5 hover:scale-105 hover:shadow-sm flex-shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">새 폴더</span>
      </Button>
    </div>
  );
};

export default FolderTabs; 
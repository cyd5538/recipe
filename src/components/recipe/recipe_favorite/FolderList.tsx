import { Folder } from "@/types/type";
import { Check, FolderIcon } from "lucide-react";



interface Props {
  folders: Folder[];
  selectedFolder: string | null;
  onSelect: (folderId: string) => void;
}

export const FolderList: React.FC<Props> = ({ folders, selectedFolder, onSelect }) => (
  <div className="space-y-1.5 mb-4 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
    {folders.map((folder) => (
      <button
        key={folder.id}
        onClick={() => onSelect(folder.id)}
        className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 ${
          selectedFolder === folder.id
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "hover:bg-gray-50 dark:hover:bg-zinc-800/50 text-gray-700 dark:text-gray-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <FolderIcon
            size={18}
            className={
              selectedFolder === folder.id
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500"
            }
          />
          <span className="font-medium">{folder.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">{folder.count}개</span>
          {selectedFolder === folder.id && (
            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Check size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
          )}
        </div>
      </button>
    ))}
  </div>
);

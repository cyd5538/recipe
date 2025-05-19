interface Props {
  onClose: () => void;
  onConfirm: () => void;
  disabled: boolean;
}

export const ModalActions: React.FC<Props> = ({ onClose, onConfirm, disabled }) => (
  <div className="flex justify-end gap-2 pt-4 border-t dark:border-zinc-800">
    <button
      onClick={onClose}
      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
    >
      취소
    </button>
    <button
      onClick={onConfirm}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      선택 완료
    </button>
  </div>
);

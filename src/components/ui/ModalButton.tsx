interface ModalButtonProps {
  onClick: () => void;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

const variantClasses = {
  primary: "bg-red-500 text-white hover:bg-red-600",
  secondary: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
};

export default function ModalButton({ onClick, variant, children }: ModalButtonProps) {
  const baseClasses = "px-6 py-2 rounded-lg font-medium transition-colors duration-200";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
} 
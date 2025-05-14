import { Loader2 } from "lucide-react";

interface CookingAnimationProps {
  isLoading: boolean;
  variant: 'button' | 'fullscreen';
}

const variants = {
  button: "w-4 h-4 animate-spin",
  fullscreen: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
};

const FullscreenLoader = () => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
    <Loader2 className="w-8 h-8 animate-spin text-red-500" />
    <p className="text-zinc-700 dark:text-zinc-300">AI가 레시피를 만들고 있어요...</p>
  </div>
);

export default function CookingAnimation({ isLoading, variant }: CookingAnimationProps) {
  if (!isLoading) return null;

  if (variant === 'fullscreen') {
    return (
      <div className={variants.fullscreen}>
        <FullscreenLoader />
      </div>
    );
  }

  return <Loader2 className={variants.button} />;
} 
import { ReactNode } from "react";
import Header from "@/components/layout/header/Header";

interface PaymentStatusProps {
  children?: ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function PaymentStatus({
  children,
  title,
  description,
  buttonText,
  onButtonClick
}: PaymentStatusProps) {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                {description}
              </p>
            )}
            {children}
            {buttonText && onButtonClick && (
              <button
                onClick={onButtonClick}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full 
                  transition-colors shadow-lg hover:opacity-90"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
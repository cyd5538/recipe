import { Coins } from "lucide-react";
import Link from "next/link";

interface CoinSectionProps {
  balance: number;
}

export default function CoinSection({ balance }: CoinSectionProps) {
  return (
    <div className="mt-4 p-4 bg-red-50 dark:bg-zinc-700/50 rounded-lg">
      <div className="flex items-center justify-center space-x-2">
        <Coins className="h-5 w-5 text-red-500" />
        <span className="text-lg font-semibold text-red-500">
          {balance} 코인
        </span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        레시피 1개 생성 시 1코인이 차감됩니다
      </p>
      <Link 
        href="/pay"
        className="mt-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline block"
      >
        코인 충전하기
      </Link>
    </div>
  );
} 
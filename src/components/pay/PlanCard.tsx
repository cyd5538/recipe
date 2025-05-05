import { Plan } from "@/types/type";

interface PlanCardProps {
  plan: Plan;
  onSelect: () => void;
}

export default function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <div 
      className={`relative rounded-2xl shadow-xl p-8 flex flex-col h-full transition-all duration-300 hover:bg-red-500 dark:hover:bg-zinc-700 group ${
        plan.popular 
          ? 'bg-white dark:bg-zinc-800 transform scale-105' 
          : 'bg-white dark:bg-zinc-800'
      }`}
      onClick={onSelect}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-zinc-900 px-3 py-1 rounded-tl-lg rounded-br-lg text-sm font-semibold">
          인기
        </div>
      )}
      
      <h3 className={`text-2xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-white`}>
        {plan.title}
      </h3>
      
      <div className="mb-6">
        <span className={`text-4xl font-bold text-red-500 dark:text-red-400 group-hover:text-white`}>
          {plan.price.toLocaleString()}원
        </span>
        <span className={`text-lg text-zinc-500 dark:text-zinc-400 group-hover:text-white/80`}>
          /월
        </span>
      </div>

      <p className={`mb-6 text-zinc-600 dark:text-zinc-300 group-hover:text-white/90`}>
        {plan.coins} 코인 제공
      </p>

      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold transition mt-auto bg-red-500 dark:bg-zinc-700 text-white border-2 border-red-500 dark:border-zinc-600 group-hover:bg-white dark:group-hover:bg-zinc-600 group-hover:text-red-500 dark:group-hover:text-zinc-200`}
      >
        구매하기
      </button>
    </div>
  );
} 
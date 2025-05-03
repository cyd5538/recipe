import Header from "@/components/layout/header/Header";
import PlanCard from "../../components/pay/PlanCard";
import { plans } from "../../constants/plans";

export default function PayPage() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              요리 레시피 프리미엄
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300">
              다양한 요리 레시피를 즐기세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 
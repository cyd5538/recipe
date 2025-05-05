"use client";

import PlanCard from "./PlanCard";
import { plans } from "@/constants/plans";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface PlanListProps {
  onSelectPlan: (price: number) => void;
}

export default function PlanList({ onSelectPlan }: PlanListProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const handlePlanSelect = (price: number) => {
    if (!user) {
      alert('로그인한 유저만 결제할 수 있습니다.');
      router.push('/login');
      return;
    }
    onSelectPlan(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {plans.map((plan) => (
        <PlanCard 
          key={plan.id} 
          plan={plan} 
          onSelect={() => handlePlanSelect(plan.price)}
        />
      ))}
    </div>
  );
} 
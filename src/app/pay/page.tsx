"use client";

import Header from "@/components/layout/header/Header";
import { loadTossPayments, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import Script from "next/script";
import PaymentModal from "@/components/pay/PaymentModal";
import PlanList from "@/components/pay/PlanList";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
const customerKey = "customer_" + Math.random().toString(36).substring(2, 11);

export default function PayPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50_000,
  });
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  
  const initializeTossPayments = async () => {
    try {
      console.log('토스페이먼츠 초기화 중...');
      const tossPayments = await loadTossPayments(clientKey);
      const paymentWidgets = tossPayments.widgets({
        customerKey,
      });
      setWidgets(paymentWidgets);
    } catch (error) {
      console.error('토스페이먼츠 초기화 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    if (!clientKey || !customerKey) {
      console.error('토스페이먼츠 키가 설정되지 않았습니다.');
      return;
    }

    initializeTossPayments();
  }, []);

  const handleSelectPlan = (price: number) => {
    setAmount({
      currency: "KRW",
      value: price,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWidgets(null);
    initializeTossPayments();
  };

  return (
    <>
      <Script src="https://js.tosspayments.com/v2/standard" strategy="beforeInteractive" />
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

            <PlanList onSelectPlan={handleSelectPlan} />
          </div>
        </main>
      </div>

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amount={amount}
        widgets={widgets}
      />
    </>
  );
} 
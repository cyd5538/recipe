"use client";

import Header from "@/components/layout/header/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidPayment, setIsValidPayment] = useState(false);

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    // 필수 결제 정보가 없는 경우
    if (!paymentKey || !orderId || !amount) {
      router.push('/pay');
      return;
    }

    // 여기서 실제 결제 검증 로직을 추가할 수 있습니다
    // 예: 서버에 결제 검증 요청을 보내는 등
    setIsValidPayment(true);
  }, [searchParams, router]);

  if (!isValidPayment) {
    return (
      <div>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                잘못된 접근입니다
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
                결제 페이지로 이동합니다.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              결제가 완료되었습니다!
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
              프리미엄 구독이 활성화되었습니다.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full 
                transition-colors shadow-lg hover:opacity-90"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 
"use client";

import { useRouter } from "next/navigation";
import PaymentStatus from "@/components/pay/success/PaymentStatus";
import { usePaymentSuccess } from "@/hooks/usePaymentSuccess";

export default function SuccessPage() {
  const router = useRouter();
  const { isLoading, isValidPayment } = usePaymentSuccess();

  if (isLoading) {
    return (
      <PaymentStatus title="결제 처리 중..." />
    );
  }

  if (!isValidPayment) {
    return (
      <PaymentStatus 
        title="잘못된 접근입니다"
        description="결제 페이지로 이동합니다."
        buttonText="결제 페이지로 돌아가기"
        onButtonClick={() => router.push("/pay")}
      />
    );
  }

  return (
    <PaymentStatus 
      title="결제가 완료되었습니다!"
      description="프리미엄 구독이 활성화되었습니다."
      buttonText="홈으로 돌아가기"
      onButtonClick={() => router.push("/")}
    />
  );
} 
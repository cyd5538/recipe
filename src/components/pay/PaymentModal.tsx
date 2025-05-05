"use client";

import { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { useState, useEffect } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: {
    currency: string;
    value: number;
  };
  widgets: TossPaymentsWidgets | null;
}

export default function PaymentModal({ isOpen, onClose, amount, widgets }: PaymentModalProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!widgets || !isOpen) return;

    async function renderWidgets() {
      try {
        await widgets?.setAmount(amount);
        
        const paymentMethodElement = document.getElementById('payment-method');
        const agreementElement = document.getElementById('agreement');
        
        if (paymentMethodElement && !paymentMethodElement.hasChildNodes()) {
          await widgets?.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          });
        }
        
        if (agreementElement && !agreementElement.hasChildNodes()) {
          await widgets?.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          });
        }
        
        setReady(true);
      } catch (error) {
        console.error('결제 위젯 렌더링 중 오류가 발생했습니다:', error);
      }
    }

    renderWidgets();

    return () => {
      if (widgets) {
        const paymentMethodElement = document.getElementById('payment-method');
        const agreementElement = document.getElementById('agreement');
        
        if (paymentMethodElement) {
          paymentMethodElement.innerHTML = '';
        }
        if (agreementElement) {
          agreementElement.innerHTML = '';
        }
        setReady(false);
      }
    };
  }, [widgets, amount, isOpen]);

  const handlePayment = async () => {
    if (!widgets) {
      console.error('결제 위젯이 초기화되지 않았습니다.');
      return;
    }

    try {
      const orderId = Math.random().toString(36).substring(2, 11);
      await widgets.requestPayment({
        orderId,
        orderName: "레시피 프리미엄 구독",
        successUrl: `${window.location.origin}/pay/success`,
        failUrl: `${window.location.origin}/pay/fail`,
        customerEmail: "customer@example.com",
        // customerName: "고객",
        // customerMobilePhone: "01012345678",
      });
    } catch (error: any) {
      if (error.message === '결제가 취소되었습니다.') {
        return;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">결제하기</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <div id="payment-method" className="mb-4" />
          <div id="agreement" className="mb-4" />
        </div>
        <button
          className="w-full px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md 
            transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!ready}
          onClick={handlePayment}
        >
          구매하기
        </button>
      </div>
    </div>
  );
} 
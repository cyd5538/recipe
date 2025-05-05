import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/client";
import { toast } from "sonner";

interface CoinData {
  balance: number;
}

export const usePaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidPayment, setIsValidPayment] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    // 필수 결제 정보가 없는 경우
    if (!paymentKey || !orderId || !amount) {
      router.push('/pay');
      return;
    }

    const addCoins = async (): Promise<void> => {
      try {
        // 사용자 정보 가져오기
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error('사용자 정보를 찾을 수 없습니다.');
          return;
        }

        // 결제 금액에 따른 코인 계산
        let coinsToAdd: number = 0;
        const paymentAmount: number = Number(amount);
        
        if (paymentAmount === 1000) {
          coinsToAdd = 5;
        } else if (paymentAmount === 5000) {
          coinsToAdd = 30;
        } else if (paymentAmount === 10000) {
          coinsToAdd = 70;
        } else {
          toast.error('유효하지 않은 결제 금액입니다.');
          router.push('/pay');
          return;
        }

        // 기존 코인 잔액 조회
        const { data: existingCoins, error: fetchError } = await supabase
          .from('coins')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116은 데이터가 없는 경우
          throw fetchError;
        }

        const currentBalance: number = existingCoins?.balance || 0;
        const newBalance: number = currentBalance + coinsToAdd;

        // 코인 업데이트 
        const { error: updateError } = await supabase
          .from('coins')
          .upsert({
            user_id: user.id,
            balance: newBalance
          }, {
            onConflict: 'user_id'
          });

        if (updateError) {
          throw updateError;
        }

        toast.success(`${coinsToAdd} 코인이 추가되었습니다! (현재 보유 코인: ${newBalance})`);
        setIsValidPayment(true);
      } catch (error) {
        console.error('코인 추가 중 오류 발생 -->', error);
        toast.error('코인 추가 중 오류가 발생했습니다.');
        router.push('/pay');
      } finally {
        setIsLoading(false);
      }
    };

    addCoins();
  }, [searchParams, router]);

  return { isLoading, isValidPayment };
}; 
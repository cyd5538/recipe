import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";
import { UserCoin } from "@/types/type";
import { toast } from "sonner";

export const useCoin = (userId: string | null) => {
  const [coin, setCoin] = useState<UserCoin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCoin = async () => {
      try {
        const { data, error } = await supabase
          .from("coins")
          .select("balance")
          .eq("user_id", userId)
          .single();

        if (error) {
          if (error.message.includes('JSON object requested, multiple (or no) rows returned')) {
            setCoin({ balance: 0 });
          } else {
            setError(error.message);
          }
        } else {
          setCoin(data);
        }
      } catch (err) {
        setError("코인 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [userId]);

  const checkCoinBalance = () => {
    if (!coin || coin.balance <= 0) {
      toast.error("코인이 부족합니다. 코인을 충전해주세요!");
      return false;
    }
    return true;
  };

  const deductCoin = async () => {
    if (!userId || !coin) return false;

    try {
      const { error } = await supabase
        .from("coins")
        .update({ balance: coin.balance - 1 })
        .eq("user_id", userId);

      if (error) {
        toast.error("코인 차감 중 오류가 발생했습니다.");
        return false;
      }

      setCoin(prev => prev ? { balance: prev.balance - 1 } : null);
      return true;
    } catch (err) {
      toast.error("코인 차감 중 오류가 발생했습니다.");
      return false;
    }
  };

  const refundCoin = async () => {
    if (!userId || !coin) return false;

    try {
      const { error } = await supabase
        .from("coins")
        .update({ balance: coin.balance + 1 })
        .eq("user_id", userId);

      if (error) {
        toast.error("코인 환불 중 오류가 발생했습니다.");
        return false;
      }

      setCoin(prev => prev ? { balance: prev.balance + 1 } : null);
      return true;
    } catch (err) {
      toast.error("코인 환불 중 오류가 발생했습니다.");
      return false;
    }
  };

  return { coin, loading, error, checkCoinBalance, deductCoin, refundCoin };
}; 
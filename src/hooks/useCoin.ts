import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface CoinData {
  balance: number;
  id: string;
}

interface UseCoinReturn {
  coin: CoinData | null;
  loading: boolean;
  checkCoinBalance: () => boolean;
  deductCoin: () => Promise<boolean>;
  refundCoin: () => Promise<boolean>;
  refreshCoinBalance: () => Promise<void>;
}

const MINIMUM_REQUIRED_BALANCE = 1;

export function useCoin(userId: string | null): UseCoinReturn {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinBalance = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('coins')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setCoin(data);
    } catch (error) {
      console.error('Error fetching coin balance:', error);
      toast.error('코인 잔액을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refreshCoinBalance = useCallback(async () => {
    setLoading(true);
    await fetchCoinBalance();
  }, [fetchCoinBalance]);

  useEffect(() => {
    fetchCoinBalance();
  }, [fetchCoinBalance]);

  const checkCoinBalance = useCallback((): boolean => {
    if (!coin || coin.balance < MINIMUM_REQUIRED_BALANCE) {
      toast.error('코인이 부족합니다. 코인을 충전해주세요.');
      return false;
    }
    return true;
  }, [coin]);

  const updateCoinBalance = useCallback(async (amount: number): Promise<boolean> => {
    if (!userId || !coin) return false;

    try {
      const { error } = await supabase
        .from('coins')
        .update({ balance: coin.balance + amount })
        .eq('id', coin.id);

      if (error) throw error;

      setCoin(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
      return true;
    } catch (error) {
      console.error('Error updating coin balance:', error);
      toast.error('코인 잔액 업데이트에 실패했습니다.');
      return false;
    }
  }, [userId, coin]);

  const deductCoin = useCallback(async (): Promise<boolean> => {
    return await updateCoinBalance(-MINIMUM_REQUIRED_BALANCE);
  }, [updateCoinBalance]);

  const refundCoin = useCallback(async (): Promise<boolean> => {
    return await updateCoinBalance(MINIMUM_REQUIRED_BALANCE);
  }, [updateCoinBalance]);

  return {
    coin,
    loading,
    checkCoinBalance,
    deductCoin,
    refundCoin,
    refreshCoinBalance
  };
} 
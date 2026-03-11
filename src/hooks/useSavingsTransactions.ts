import {useState, useEffect, useCallback} from 'react';
import {fetchSavingsAccounts, fetchSavingsAccountWithTransactions} from '../services/savingsService';
import type {SavingsAccountWithTransactions} from '../services/types';

export function useSavingsTransactions(clientId: number | null) {
  const [savingsDetails, setSavingsDetails] =
    useState<SavingsAccountWithTransactions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!clientId) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Step 1: Get savings accounts for the client
      const accounts = await fetchSavingsAccounts(clientId);

      if (accounts.length === 0) {
        setSavingsDetails(null);
        setLoading(false);
        return;
      }

      // Step 2: Get transactions for the first active savings account
      const activeAccount = accounts.find(a => a.status?.active) ?? accounts[0];
      const details = await fetchSavingsAccountWithTransactions(activeAccount.id);
      setSavingsDetails(details);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load transactions',
      );
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {savingsDetails, loading, error, refetch: fetchData};
}

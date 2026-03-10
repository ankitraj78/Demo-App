import {useState, useEffect, useCallback} from 'react';
import {fetchLoanAccounts} from './loanService';
import type {LoanAccount} from './types';

type UseLoanAccountsResult = {
  loanAccounts: LoanAccount[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useLoanAccounts(clientId: number): UseLoanAccountsResult {
  const [loanAccounts, setLoanAccounts] = useState<LoanAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const accounts = await fetchLoanAccounts(clientId);
      setLoanAccounts(accounts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load loan accounts',
      );
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return {loanAccounts, loading, error, refetch: loadAccounts};
}

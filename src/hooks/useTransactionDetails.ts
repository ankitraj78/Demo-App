import {useState, useEffect, useCallback} from 'react';
import {fetchLoanTransactionDetails} from '../services/loanService';
import type {LoanTransactionDetails} from '../services/types';

type UseTransactionDetailsResult = {
  details: LoanTransactionDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useTransactionDetails(
  loanId: number,
  transactionId: number,
): UseTransactionDetailsResult {
  const [details, setDetails] = useState<LoanTransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLoanTransactionDetails(loanId, transactionId);
      setDetails(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load transaction details',
      );
    } finally {
      setLoading(false);
    }
  }, [loanId, transactionId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  return {details, loading, error, refetch: loadDetails};
}

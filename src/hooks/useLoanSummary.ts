import {useState, useEffect, useCallback} from 'react';
import {fetchLoanWithAssociations} from '../services/loanService';
import type {LoanWithAssociations} from '../services/types';

type UseLoanSummaryResult = {
  loanSummary: LoanWithAssociations | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useLoanSummary(loanId: number): UseLoanSummaryResult {
  const [loanSummary, setLoanSummary] = useState<LoanWithAssociations | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await fetchLoanWithAssociations(
        loanId,
        'repaymentSchedule',
      );
      console.log('[LoanSummary] Raw API response:', JSON.stringify(details, null, 2));
      setLoanSummary(details);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load loan summary',
      );
    } finally {
      setLoading(false);
    }
  }, [loanId]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  return {loanSummary, loading, error, refetch: loadSummary};
}

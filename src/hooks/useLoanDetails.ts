import {useState, useEffect, useCallback} from 'react';
import {fetchLoanWithAssociations} from '../services/loanService';
import type {LoanWithAssociations} from '../services/types';

type UseLoanDetailsResult = {
  loanDetails: LoanWithAssociations | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useLoanDetails(loanId: number): UseLoanDetailsResult {
  const [loanDetails, setLoanDetails] = useState<LoanWithAssociations | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await fetchLoanWithAssociations(loanId);
      setLoanDetails(details);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load loan details',
      );
    } finally {
      setLoading(false);
    }
  }, [loanId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  return {loanDetails, loading, error, refetch: loadDetails};
}

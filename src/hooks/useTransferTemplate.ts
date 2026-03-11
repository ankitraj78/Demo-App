import {useState, useEffect, useCallback} from 'react';
import {fetchTransferTemplate} from '../services/transferService';
import type {AccountOption} from '../services/types';

type UseTransferTemplateResult = {
  fromAccounts: AccountOption[];
  toAccounts: AccountOption[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useTransferTemplate(): UseTransferTemplateResult {
  const [fromAccounts, setFromAccounts] = useState<AccountOption[]>([]);
  const [toAccounts, setToAccounts] = useState<AccountOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTemplate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const template = await fetchTransferTemplate();
      setFromAccounts(template.fromAccountOptions ?? []);
      setToAccounts(template.toAccountOptions ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load transfer template',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  return {fromAccounts, toAccounts, loading, error, refetch: loadTemplate};
}

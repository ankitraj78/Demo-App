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

export function useTransferTemplate(type?: 'tpt'): UseTransferTemplateResult {
  const [fromAccounts, setFromAccounts] = useState<AccountOption[]>([]);
  const [toAccounts, setToAccounts] = useState<AccountOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTemplate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const template = await fetchTransferTemplate(type);
      // Only show savings accounts in "Pay From" (accountType id 2 = Savings)
      const savingsOnly = (template.fromAccountOptions ?? []).filter(
        acc => acc.accountType?.id === 2,
      );
      setFromAccounts(savingsOnly);
      setToAccounts(template.toAccountOptions ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load transfer template',
      );
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  return {fromAccounts, toAccounts, loading, error, refetch: loadTemplate};
}

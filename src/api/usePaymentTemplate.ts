import {useState, useEffect, useCallback} from 'react';
import {fetchPaymentTemplate} from './transferService';
import type {AccountOption} from './types';

type UsePaymentTemplateResult = {
  fromAccounts: AccountOption[];
  toAccounts: AccountOption[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function usePaymentTemplate(
  fromAccountId: number,
  fromAccountType: number,
): UsePaymentTemplateResult {
  const [fromAccounts, setFromAccounts] = useState<AccountOption[]>([]);
  const [toAccounts, setToAccounts] = useState<AccountOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTemplate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const template = await fetchPaymentTemplate(fromAccountId, fromAccountType);
      setFromAccounts(template.fromAccountOptions ?? []);
      setToAccounts(template.toAccountOptions ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load payment template',
      );
    } finally {
      setLoading(false);
    }
  }, [fromAccountId, fromAccountType]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  return {fromAccounts, toAccounts, loading, error, refetch: loadTemplate};
}

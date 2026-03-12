import {useState, useEffect, useCallback} from 'react';
import {
  fetchBeneficiaries,
  fetchBeneficiaryTemplate,
} from '../services/beneficiaryService';
import type {Beneficiary, AccountType} from '../services/types';

type UseBeneficiaryDataResult = {
  beneficiaries: Beneficiary[];
  accountTypeOptions: AccountType[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useBeneficiaryData(): UseBeneficiaryDataResult {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [accountTypeOptions, setAccountTypeOptions] = useState<AccountType[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [beneficiaryList, template] = await Promise.all([
        fetchBeneficiaries(),
        fetchBeneficiaryTemplate(),
      ]);
      setBeneficiaries(beneficiaryList);
      setAccountTypeOptions(template.accountTypeOptions ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load beneficiary data',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {beneficiaries, accountTypeOptions, loading, error, refetch: loadData};
}

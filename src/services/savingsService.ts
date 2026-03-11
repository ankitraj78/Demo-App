import {apiClient} from './apiClient';
import type {
  SavingsAccount,
  SavingsAccountsResponse,
  SavingsAccountWithTransactions,
} from './types';

// GET /clients/{clientId}/accounts?fields=savingsAccounts
export async function fetchSavingsAccounts(
  clientId: number,
): Promise<SavingsAccount[]> {
  const response = await apiClient<SavingsAccountsResponse>(
    `/clients/${clientId}/accounts?fields=savingsAccounts`,
  );
  return response.savingsAccounts ?? [];
}

// GET /savingsaccounts/{accountId}?associations=transactions
export async function fetchSavingsAccountWithTransactions(
  accountId: number,
): Promise<SavingsAccountWithTransactions> {
  return apiClient<SavingsAccountWithTransactions>(
    `/savingsaccounts/${accountId}?associations=transactions`,
  );
}

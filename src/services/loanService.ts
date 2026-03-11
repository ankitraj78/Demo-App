import {apiClient} from './apiClient';
import type {AccountsResponse, LoanAccount, LoanTransactionDetails, LoanWithAssociations} from './types';

// Matches Mifos: GET /clients/{clientId}/accounts
export async function fetchLoanAccounts(
  clientId: number,
): Promise<LoanAccount[]> {
  const response = await apiClient<AccountsResponse>(
    `/clients/${clientId}/accounts?fields=loanAccounts`,
  );
  return response.loanAccounts ?? [];
}

// Matches Mifos: GET /loans/{loanId}?associations=transactions
export async function fetchLoanWithAssociations(
  loanId: number,
  associationType: string = 'transactions',
): Promise<LoanWithAssociations> {
  return apiClient<LoanWithAssociations>(
    `/loans/${loanId}?associations=${associationType}`,
  );
}

// Matches Mifos: GET /loans/{loanId}/transactions/{transactionId}
export async function fetchLoanTransactionDetails(
  loanId: number,
  transactionId: number,
): Promise<LoanTransactionDetails> {
  return apiClient<LoanTransactionDetails>(
    `/loans/${loanId}/transactions/${transactionId}`,
  );
}

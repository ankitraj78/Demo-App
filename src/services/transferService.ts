import {apiClient} from './apiClient';
import type {AccountOptionsTemplate, TransferPayload} from './types';

// Matches Mifos: GET /accounttransfers/template?type=tpt
export async function fetchTransferTemplate(): Promise<AccountOptionsTemplate> {
  return apiClient<AccountOptionsTemplate>(
    '/accounttransfers/template?type=tpt',
  );
}

// Matches Mifos: GET /accounttransfers/template?fromAccountId=&fromAccountType= (self transfer)
export async function fetchPaymentTemplate(
  fromAccountId: number,
  fromAccountType: number,
): Promise<AccountOptionsTemplate> {
  return apiClient<AccountOptionsTemplate>(
    `/accounttransfers/template?fromAccountId=${fromAccountId}&fromAccountType=${fromAccountType}`,
  );
}

// Matches Mifos: POST /accounttransfers?type=tpt (third party)
export async function makeThirdPartyTransfer(
  payload: TransferPayload,
): Promise<unknown> {
  return apiClient('/accounttransfers?type=tpt', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Matches Mifos: POST /accounttransfers (self transfer)
export async function makeSelfTransfer(
  payload: TransferPayload,
): Promise<unknown> {
  return apiClient('/accounttransfers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

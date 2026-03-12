import {apiClient} from './apiClient';
import type {
  Beneficiary,
  BeneficiaryTemplate,
  CreateBeneficiaryPayload,
} from './types';

export async function fetchBeneficiaries(): Promise<Beneficiary[]> {
  return apiClient<Beneficiary[]>('/beneficiaries/tpt');
}

export async function fetchBeneficiaryTemplate(): Promise<BeneficiaryTemplate> {
  return apiClient<BeneficiaryTemplate>('/beneficiaries/tpt/template');
}

export async function createBeneficiary(
  payload: CreateBeneficiaryPayload,
): Promise<unknown> {
  return apiClient('/beneficiaries/tpt', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

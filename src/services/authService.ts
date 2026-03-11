import {apiClient} from './apiClient';
import type {LoginPayload, LoginResponse} from './types';

// Matches Mifos: POST /authentication
export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  return apiClient<LoginResponse>('/authentication', {
    method: 'POST',
    body: JSON.stringify({username, password} satisfies LoginPayload),
  });
}

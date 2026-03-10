const BASE_URL = 'http://10.0.3.139:8080/fineract-provider/api/v1/self';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Fineract-Platform-TenantId': 'default',
};

let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...((options.headers as Record<string, string>) || {}),
  };

  if (authToken) {
    headers.Authorization = `Basic ${authToken}`;
  }

  const url = `${BASE_URL}${endpoint}`;
  console.log(`[API] ${options.method ?? 'GET'} ${url}`);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log(`[API] ${response.status} ${response.statusText} <- ${url}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

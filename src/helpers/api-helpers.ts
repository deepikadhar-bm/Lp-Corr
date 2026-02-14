import { Page, APIRequestContext } from '@playwright/test';

export async function apiGet(request: APIRequestContext, url: string, headers?: Record<string, string>) {
  const response = await request.get(url, { headers });
  return response.json();
}

export async function apiPost(request: APIRequestContext, url: string, data: unknown, headers?: Record<string, string>) {
  const response = await request.post(url, { data, headers });
  return response.json();
}

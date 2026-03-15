import { env } from '@/lib/env';
import { logger } from '@/lib/logger';

export const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

type ApiFetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function apiFetch<T>(
  path: string,
  options?: ApiFetchOptions,
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      logger.error('API request failed', {
        path,
        status: res.status,
        statusText: res.statusText,
      });

      throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    logger.error('API fetch exception', {
      path,
      error,
    });

    throw error;
  }
}

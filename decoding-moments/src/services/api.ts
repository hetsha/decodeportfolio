const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchAPI<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_URL}/api${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new ApiError(`API error: ${response.status} ${response.statusText}`, response.status);
  }

  return response.json();
}

export async function postAPI<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  const url = `${API_URL}/api${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.error?.message || `API error: ${response.status}`,
      response.status
    );
  }

  return response.json();
}

export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${API_URL}${url}`;
}

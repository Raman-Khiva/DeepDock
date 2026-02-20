import { useAuth } from "@clerk/nextjs";

export async function fetchWithAuth(url, options) {
  const { getToken } = useAuth();
  const token = await getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
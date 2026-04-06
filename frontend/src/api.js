const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function createQr(payload) {
  const res = await fetch(`${API_URL}/qr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create QR');
  return res.json();
}

export async function trackPageView(path) {
  try {
    await fetch(`${API_URL}/public/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, referrer: document.referrer })
    });
  } catch (err) {
    // analytics should never block UX
  }
}

export async function fetchPublicData(endpoint) {
  const res = await fetch(`${API_URL}/public/${endpoint}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

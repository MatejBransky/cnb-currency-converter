export async function getExchangeRates() {
  const res = await fetch("/rates");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

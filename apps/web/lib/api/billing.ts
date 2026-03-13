export async function createCheckoutSession() {
  const res = await fetch('/api/billing/checkout', {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
}

export async function createBillingPortal() {
  const res = await fetch('/api/billing/portal', {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
}

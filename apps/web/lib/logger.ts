export function logError(error: unknown, context?: string) {
  console.error('App Error:', {
    error,
    context,
  });
}

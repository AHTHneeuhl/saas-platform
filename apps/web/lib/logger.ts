export function logError(error: unknown, context?: string) {
  console.error('App Error:', {
    error,
    context,
  });
}

const isProd = process.env.NODE_ENV === 'production';

export const logger = {
  log: (...args: unknown[]) => {
    if (!isProd) {
      console.log(...args);
    }
  },

  info: (...args: unknown[]) => {
    console.info(...args);
  },

  warn: (...args: unknown[]) => {
    console.warn(...args);
  },

  error: (...args: unknown[]) => {
    console.error(...args);
  },
};

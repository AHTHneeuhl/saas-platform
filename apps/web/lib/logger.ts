const isProd = process.env.NODE_ENV === 'production';

type LogContext = Record<string, unknown>;

function formatError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }

  return { error };
}

export function logError(error: unknown, context?: LogContext) {
  const payload = {
    error: formatError(error),
    context,
    timestamp: new Date().toISOString(),
  };

  console.error('App Error:', payload);
}

export const logger = {
  log: (...args: unknown[]) => {
    if (!isProd) console.log(...args);
  },

  info: (...args: unknown[]) => {
    console.info(...args);
  },

  warn: (...args: unknown[]) => {
    console.warn(...args);
  },

  error: (error: unknown, context?: LogContext) => {
    logError(error, context);
  },
};

const DEFAULT_RETRIES = 2;
const DEFAULT_DELAY_MS = 300;

const wait = (delayMs) =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

const toErrorMessage = (error) =>
  `${error?.message ?? error?.error_description ?? error ?? ""}`.toLowerCase();

export const isSupabaseLockError = (error) => {
  const message = toErrorMessage(error);

  return (
    message.includes("lock") &&
    (message.includes("acquire") ||
      message.includes("session") ||
      message.includes("navigator") ||
      message.includes("refresh"))
  );
};

export const withSupabaseRetry = async (
  operation,
  { retries = DEFAULT_RETRIES, delayMs = DEFAULT_DELAY_MS } = {},
) => {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const result = await operation();

      if (!result?.error) {
        return result;
      }

      if (!isSupabaseLockError(result.error) || attempt === retries) {
        return result;
      }
    } catch (error) {
      if (!isSupabaseLockError(error) || attempt === retries) {
        throw error;
      }
    }

    await wait(delayMs * (attempt + 1));
  }

  return operation();
};

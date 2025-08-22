import { ZodError } from 'zod';

export function formatZodError(err: ZodError) {
  const flattened = err.flatten();
  const errors = Object.entries(flattened.fieldErrors).flatMap(([field, msgs]) =>
    (msgs as string[]).map((message) => ({ field, message }))
  );
  const form = (flattened.formErrors ?? []).map((message) => ({ field: null, message }));
  return { success: false, message: 'Invalid data', errors: [...errors, ...form] };
}

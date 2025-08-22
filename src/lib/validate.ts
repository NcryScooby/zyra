import { z } from 'zod';
import { NextRequest } from 'next/server';
import { errorToResponse } from './error-to-response';

export function withValidation<S extends z.ZodTypeAny, R = NextRequest, C = unknown>(
  schema: S,
  mapInput: (req: R, ctx: C) => Promise<z.input<S>> | z.input<S>
) {
  return (next: (parsed: z.infer<S>, req: R, ctx: C) => Promise<Response> | Response) => async (req: R, ctx: C) => {
    try {
      const raw = await mapInput(req, ctx);
      const parsed = schema.parse(raw);
      return await next(parsed, req, ctx);
    } catch (err) {
      return errorToResponse(err);
    }
  };
}

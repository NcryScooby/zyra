import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { formatZodError } from './error-format';
import { ValidationError, NotFoundError, ConflictError } from '@/domain/errors';
import { StatusCodes } from 'http-status-codes';

export function errorToResponse(err: unknown) {
  if (err instanceof ZodError) {
    return NextResponse.json(formatZodError(err), { status: StatusCodes.BAD_REQUEST });
  }

  if (err instanceof ValidationError) {
    return NextResponse.json({ success: false, message: err.message, errors: [] }, { status: StatusCodes.BAD_REQUEST });
  }

  if (err instanceof NotFoundError) {
    return NextResponse.json({ success: false, message: err.message, errors: [] }, { status: StatusCodes.NOT_FOUND });
  }

  if (err instanceof ConflictError) {
    return NextResponse.json({ success: false, message: err.message, errors: [] }, { status: StatusCodes.CONFLICT });
  }

  return NextResponse.json(
    { success: false, message: 'Internal server error', errors: [] },
    { status: StatusCodes.INTERNAL_SERVER_ERROR }
  );
}

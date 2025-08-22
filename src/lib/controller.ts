import { NextResponse } from 'next/server';
import { errorToResponse } from './error-to-response';

type Options = { successStatus?: number };

export function controller<TArgs extends unknown[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>,
  options: Options = {}
) {
  const { successStatus = 200 } = options;

  return async (...args: TArgs) => {
    try {
      const data = await handler(...args);
      return NextResponse.json({ success: true, data }, { status: successStatus });
    } catch (err) {
      return errorToResponse(err);
    }
  };
}

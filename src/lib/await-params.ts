export async function awaitParams<T>(ctx: { params: T | Promise<T> }): Promise<T> {
  return await Promise.resolve(ctx.params);
}

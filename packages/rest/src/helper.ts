import { PaystackOptions } from './types';

export const isEndpointKey = <Keys extends PropertyKey, Group extends string>(
  val: unknown,
): val is Keys => {
  // TODO: FIX THIS
  return true;
};

export const getDefaultOptions = (token: string): PaystackOptions => {
  if (!token) {
    throw new Error('PAYSTACK_SECRET_KEY not found');
  }

  return {
    token,
  };
};

export const buildOptions = (
  options: string | PaystackOptions,
): PaystackOptions => {
  if (typeof options === 'string') {
    return getDefaultOptions(options);
  }

  return {
    ...getDefaultOptions(options.token),
    ...options,
  };
};

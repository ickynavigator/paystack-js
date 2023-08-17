import { AcceptableMethods, PaystackOptions } from './types';

export class Base {
  static BASE_URL = 'https://api.paystack.co';
  private options: PaystackOptions;

  constructor(option: PaystackOptions) {
    this.options = option;
  }

  setToken(token: string) {
    this.options.token = token;
  }

  async query<Action, Parameters, Result>(
    base: string,
    method: AcceptableMethods,
    path: string,
    options: Parameters,
  ) {
    console.table(this.options);
    console.log('base:', base);
    console.log('method:', method);
    console.log('path:', path);
    console.log('options:', options);

    return {} as Promise<Result>;
  }
}

export default Base;

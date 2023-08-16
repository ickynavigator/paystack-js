import { AcceptableMethods, PaystackOptions } from './types';

export class Base {
  static BASE_URL = 'https://api.paystack.co';
  private authToken: string;

  constructor(option: PaystackOptions) {
    this.authToken = option.token;
  }

  setToken(token: string) {
    this.authToken = token;
  }

  async query<Action, Parameters, Result>(
    base: string,
    method: AcceptableMethods,
    path: string,
    options: Parameters,
  ) {
    console.log(this.authToken);
    console.log('base:', base);
    console.log('method:', method);
    console.log('path:', path);
    console.log('options:', options);

    return {} as Promise<Result>;
  }
}

export default Base;

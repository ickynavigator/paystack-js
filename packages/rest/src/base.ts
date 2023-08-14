import ApplePay from './endpoints/applePay';
import { AcceptableMethods } from './types';

/** @private NOT TO BE USED. USE THE ACTUAL `Paystack` CLASS */
class Base {
  static BASE_URL = 'https://api.paystack.co';
  private authToken!: string;

  /** The Apple Pay API allows you register your application's top-level domain or subdomain. */
  applePay = new ApplePay();

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

    return {} as Promise<Result>;
  }
}

export default Base;

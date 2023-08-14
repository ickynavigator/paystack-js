import ApplePay from './endpoints/applePay';
import Miscellaneous from './endpoints/miscellaneous';
import SubAccounts from './endpoints/subAccounts';
import { AcceptableMethods } from './types';

/** @private NOT TO BE USED. USE THE ACTUAL `Paystack` CLASS */
class Base {
  static BASE_URL = 'https://api.paystack.co';
  private authToken!: string;

  /** The Apple Pay API allows you register your application's top-level domain or subdomain. */
  applePay = new ApplePay();
  /** The Subaccounts API allows you create and manage subaccounts on your integration. Subaccounts can be used to split payment between two accounts (your main account and a sub account) */
  subAccounts = new SubAccounts();
  /** The Miscellaneous API are supporting APIs that can be used to provide more details to other APIs. */
  miscellaneous = new Miscellaneous();

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

/** @private NOT TO BE USED ON IT'S OWN. USE THE ACTUAL `Paystack` CLASS */
class Base {
  static BASE_URL = 'https://api.paystack.co';
  private authToken!: string;

  setToken(token: string) {
    this.authToken = token;
  }

  async query<Action, B, R>(
    base: string,
    method: string,
    path: string,
    options: B,
  ) {
    console.log(this.authToken);

    return {} as Promise<R>;
  }
}

export default Base;

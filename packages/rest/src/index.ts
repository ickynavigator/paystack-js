import Base from './base';

class Paystack extends Base {
  constructor(token: string) {
    super();
    this.setToken(token);
  }
}

export default Paystack;

import Paystack from '.';

const p = new Paystack('sk_test_1234567890');

p.applePay.listDomains({
  query: {
    next: 'sttt',
  },
});

p.miscellaneous.listBanks({});

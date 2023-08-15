import Paystack from '.';

const p = new Paystack('sk_test_1234567890');

p.applePay.listDomains();

p.miscellaneous.listBanks({});

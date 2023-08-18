# Mantine Hooks

[![npm](https://img.shields.io/npm/dm/@paystack-js/rest)](https://www.npmjs.com/package/@paystack-js/rest)

A simple Paystack SDK for Node.js

## Installation

```bash
# With yarn
yarn add @paystack-js/rest

# With npm
npm install @paystack-js/rest
```

### Usage

```ts
import Paystack from '@paystack/rest';

// initialize with either the token or an object containing the config
const p1 = new Paystack('sk_test_1234567890');
const p2 = new Paystack({
  token: 'sk_test_1234567890',
});

// await the result
const res = await p1.miscellaneous.listBanks();

p1.applePay.listDomains({
  query: { use_cursor: true },
});
p1.applePay.registerDomain({
  body: { domainName: 'example.com' },
});
p1.subAccounts.fetchSubaccount({
  params: { id_or_code: '1234567890' },
});
p1.subAccounts.updateSubaccount({
  params: { id_or_code: '1234567890' },
  body: { active: false },
});
```

## License

MIT

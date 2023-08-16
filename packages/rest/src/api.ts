import { buildOptions, isEndpointKey } from './helper';
import { GroupDef, OptionsExtract, PaystackOptions } from './types';
// endpoints
import Base from './base';
import applePay from './endpoints/applePay';
import miscellaneous from './endpoints/miscellaneous';
import subAccounts from './endpoints/subAccounts';

type ApplePay = Parameters<typeof applePay.builder>[1];
type SubAccounts = Parameters<typeof subAccounts.builder>[1];
type Miscellaneous = Parameters<typeof miscellaneous.builder>[1];

export class Api extends Base {
  /** The Apple Pay API allows you register your application's top-level domain or subdomain. */
  applePay: ApplePay;
  /** The Subaccounts API allows you create and manage subaccounts on your integration. Subaccounts can be used to split payment between two accounts (your main account and a sub account) */
  subAccounts: SubAccounts;
  /** The Miscellaneous API are supporting APIs that can be used to provide more details to other APIs. */
  miscellaneous: Miscellaneous;

  constructor(options: string | PaystackOptions) {
    super(buildOptions(options));

    this.applePay = {} as ApplePay;
    this.subAccounts = {} as SubAccounts;
    this.miscellaneous = {} as Miscellaneous;

    const items = [applePay, subAccounts, miscellaneous];
    const handleBinding = (item: GroupDef<any, any>) => {
      const { group, BASE_URL, builder, members } = item;
      type Members = Parameters<typeof builder>[0];

      Object.keys(members).forEach(key => {
        if (!isEndpointKey<keyof typeof members, typeof group>(key)) return;
        const current = members[key];
        type Action = Members[typeof key];
        type Opt = OptionsExtract<Action, typeof current.path>;
        type Ret = Action['return'];
        const method = async function (this: Api, options: Opt) {
          return this.query<Action, Opt, Ret>(
            BASE_URL,
            current.method,
            current.path,
            options,
          );
        };
        // @ts-expect-error
        this[group][key] = method.bind(this);
      });
    };

    items.forEach(handleBinding);
  }
}

export default Api;

import Base from '../base';
import { isEndpointKey } from '../helper';
import { Metadata } from '../models';
import {
  BaseReturn,
  ClassBuilder,
  EndpointMember,
  EndpointMemberParameters,
  LooseString,
  OptionsExtract,
} from '../types';

const BASE_URL = `/subaccount`;
const members = {
  /** Create a subacount on your integration */
  createSubaccount: {
    method: 'POST',
    path: '/',
  },
  /** List subaccounts available on your integration */
  listSubaccounts: {
    method: 'GET',
    path: '/',
  },
  /** Get details of a subaccount on your integration.
   *
   * id_or_code - Subaccount's ID or code
   */
  fetchSubaccount: {
    method: 'GET',
    path: '/{id_or_code}',
  },
  /** Update a subaccount details on your integration
   *
   * id_or_code - Subaccount's ID or code
   */
  updateSubaccount: {
    method: 'PUT',
    path: '/{id_or_code}',
  },
} as const satisfies EndpointMember;

export type Members = EndpointMemberParameters<
  typeof members,
  {
    createSubaccount: {
      body: {
        /** Name of business for subaccount */
        business_name: string;
        /** Bank Code for the bank. You can get the list of Bank Codes by calling the [List Banks](./miscellaneous.ts) endpoint */
        settlement_bank: string;
        /** Bank Account Number */
        account_number: string;
        /** The default percentage charged when receiving on behalf of this subaccount */
        percentage_charge: number;
        /** A description for this subaccount */
        description?: string;

        /** A contact email for the subaccount */
        primary_contact_email?: string;
        /** A name for the contact person for this subaccount */
        primary_contact_name?: string;
        /** A phone number to call for this subaccount */
        primary_contact_phone?: string;
      } & Metadata;
      query: {};
      return: BaseReturn;
    };
    listSubaccounts: {
      body: {};
      query: {
        /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
        perPage?: number;
        /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
        page?: number;
        /** A timestamp from which to start listing subaccounts e.g. 2016-09-24T00:00:05.000Z, 2016-09-21 */
        from?: string | Date;
        /** A timestamp at which to stop listing subaccounts e.g. 2016-09-24T00:00:05.000Z, 2016-09-21 */
        to?: string | Date;
      };
      return: BaseReturn;
    };
    fetchSubaccount: {
      body: {};
      query: {};
      return: BaseReturn;
    };
    updateSubaccount: {
      body: {
        /** Name of business for subaccount */
        business_name?: string;
        /** Bank Code for the bank. You can get the list of Bank Codes by calling the [List Banks](./miscellaneous.ts) endpoint */
        settlement_bank?: string;
        /** Bank Account Number */
        account_number?: string;
        /** Activate or deactivate a subaccount. Set value to true to activate subaccount or false to deactivate the subaccount. */
        active?: boolean;
        /** The default percentage charged when receiving on behalf of this subaccount */
        percentage_charge?: number;
        /** A description for this subaccount */
        description?: string;

        /** A contact email for the subaccount */
        primary_contact_email?: string;
        /** A name for the contact person for this subaccount */
        primary_contact_name?: string;
        /** A phone number to call for this subaccount */
        primary_contact_phone?: string;
        /** Any of `auto`, `weekly`, `monthly`, `manual`. Auto means payout is T+1 and manual means payout to the subaccount should only be made when requested. Defaults to auto */
        settlement_schedule?: LooseString<
          'auto' | 'weekly' | 'monthly' | 'manual'
        >;
      } & Metadata;
      query: {};
      return: BaseReturn;
    };
  }
>;

type SubAccounts = ClassBuilder<Members, typeof members>;

const SubAccounts = class SubAccounts extends Base {} as unknown as new (
  ...args: ConstructorParameters<typeof Base>
) => SubAccounts;

Object.keys(members).forEach(key => {
  if (!isEndpointKey<keyof typeof members>(key)) return;

  const current = members[key];

  type Action = Members[typeof key];
  type Opt = OptionsExtract<Action, typeof current.path>;
  type Ret = Action['return'];

  SubAccounts.prototype[key] = async function (
    this: SubAccounts,
    options: Opt,
  ) {
    return this.query<Action, Opt, Ret>(
      BASE_URL,
      current.method,
      current.path,
      options,
    );
  };
});

export default SubAccounts;

import { Metadata } from '../models';
import {
  BaseReturn,
  ClassBuilder,
  EndpointMember,
  EndpointMemberParameters,
  GroupDef,
  LooseString,
  TightString,
} from '../types';

const BASE_URL = `/`;
const members = {
  /** Get a list of all supported banks and their properties */
  listBanks: {
    method: 'GET',
    path: '/bank',
  },
  /** Gets a list of countries that Paystack currently supports */
  listCountries: {
    method: 'GET',
    path: '/country',
  },
  /** Get a list of states for a country for address verification */
  listStatesAVS: {
    method: 'GET',
    path: '/address_verification/states',
  },
} as const satisfies EndpointMember;

export type Members = EndpointMemberParameters<
  typeof members,
  {
    listBanks: {
      body: {
        /** The country from which to obtain the list of supported banks. e.g country=ghana or country=nigeria */
        country?: string;
        /** Flag to enable cursor pagination on the endpoint */
        use_cursor?: boolean;
        /** The number of objects to return per page. Defaults to 50, and limited to 100 records per page. */
        perPage?: string;

        /** A flag to filter for available banks a customer can make a transfer to complete a payment */
        pay_with_bank_transfer?: boolean;
        /** A flag to filter for banks a customer can pay directly from */
        pay_with_bank?: boolean;
        /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
        next?: string;
        /** A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an intial next request */
        previous?: string;
        /** The gateway type of the bank. It can be one of these: [emandate, digitalbankmandate]  */
        gateway?: LooseString<'emandate' | 'digitalbankmandate'>;
        /** Type of financial channel. For Ghanaian channels, please use either mobile_money for mobile money channels OR ghipps for bank channels */
        type?: LooseString<'mobile_money' | 'ghipps'>;
        /** Any of NGN, USD, GHS or ZAR */
        currency?: TightString<'NGN' | 'USD' | 'GHS' | 'ZAR'>;
      } & Metadata;
      query: {};
      return: BaseReturn<any[]>;
    };
    listCountries: {
      body: {};
      query: {};
      return: BaseReturn<any[]>;
    };
    listStatesAVS: {
      body: {};
      query: {
        /** The country code of the states to list. It is gotten after the charge request. */
        country: string;
      };
      return: BaseReturn<any[]>;
    };
  }
>;

const miscellaneous: GroupDef<typeof members, Members> = {
  group: 'miscellaneous',
  BASE_URL,
  members,
  builder: (a: Members, b: ClassBuilder<Members, typeof members>) => {},
};

export default miscellaneous;

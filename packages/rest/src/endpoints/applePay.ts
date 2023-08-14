import Base from '../base';
import { isEndpointKey } from '../helper';
import {
  BaseReturn,
  ClassBuilder,
  EndpointMember,
  EndpointMemberParameters,
  OptionsExtract,
} from '../types';

const BASE_URL = `/apple-pay`;
const members = {
  /** Register a top-level domain or subdomain for your Apple Pay integration. */
  registerDomain: {
    method: 'POST',
    path: `/domains`,
  },
  /** Lists all registered domains on your integration. Returns an empty array if no domains have been added. */
  listDomains: {
    method: 'GET',
    path: `/domains`,
  },
  /** Unregister a top-level domain or subdomain previously used for your Apple Pay integration. */
  unregisterDomain: {
    method: 'DELETE',
    path: `/domains`,
  },
} as const satisfies EndpointMember;

export type Members = EndpointMemberParameters<
  typeof members,
  {
    registerDomain: {
      body: {
        /** Domain name to be registered */
        domainName: string;
      };
      query: {};
      return: {
        data: BaseReturn;
      };
    };
    listDomains: {
      body: {};
      query: {
        /** Flag to enable cursor pagination on the endpoint */
        use_cursor?: boolean;
        /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
        next?: string;
        /** A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an intial next request */
        previous?: string;
      };
      return: {
        data: BaseReturn<{ domainNames: string[] }>;
      };
    };
    unregisterDomain: {
      body: {
        /** Domain name to be unregistered */
        domainName: string;
      };
      query: {};
      return: {
        data: BaseReturn;
      };
    };
  }
>;

type ApplePay = ClassBuilder<Members, typeof members>;

const ApplePay = class ApplePay extends Base {} as unknown as new (
  ...args: ConstructorParameters<typeof Base>
) => ApplePay;

Object.keys(members).forEach(key => {
  if (!isEndpointKey<keyof typeof members>(key)) return;

  const current = members[key];

  type Action = Members[typeof key];
  type Opt = OptionsExtract<Action, typeof current.path>;
  type Ret = Action['return'];

  ApplePay.prototype[key] = async function (this: ApplePay, options: Opt) {
    return this.query<Action, Opt, Ret>(
      BASE_URL,
      current.method,
      current.path,
      options,
    );
  };
});

export default ApplePay;

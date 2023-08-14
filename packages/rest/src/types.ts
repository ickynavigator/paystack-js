import Base from './base';

//#region GENERAL HELPERS
export type Exact<T, U, Y = true, N = false> = (<G>() => G extends T
  ? 1
  : 2) extends <G>() => G extends U ? 1 : 2
  ? Y
  : N;

export type EmptyObject<X> = keyof X extends never ? true : false;

export type IsRecordContainingAnyRequiredFields<T> = Exact<
  keyof Pick<
    T,
    { [P in keyof T]: undefined extends T[P] ? P : never }[keyof T]
  >,
  keyof T | undefined
>;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type LooseString<T extends string = string> = T | ({} & string);
export type TightString<T extends string> = T;
//#endregion

//#region ENDPOINT BUILDERS
export type ParseParams<T extends string> =
  T extends `${infer _}{${infer Current}}${infer Next}`
    ? [Current, ...ParseParams<Next>]
    : [];
export type Params<T extends string> = {
  [key in ParseParams<T>[number]]: string;
};

export type AcceptableMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type AcceptableTypes = string | number | boolean | Date;

export type Endpoint = {
  readonly method: AcceptableMethods;
  readonly path: string;
  readonly meta?: Record<string, any>;
};
export type EndpointMember = { [x: string]: Endpoint };
export type EndpointMemberRelated = {
  query?: Record<string, AcceptableTypes>;
  body?: Record<string, AcceptableTypes>;
  return: any;
};
export type EndpointMemberParameters<
  M extends EndpointMember,
  Final extends Record<keyof M, EndpointMemberRelated>,
> = Final;

export type OptionsExtract<
  Action extends Members[keyof Members],
  Path extends string,
  PathParams = Params<Path>,
  Endpoints extends EndpointMember = EndpointMember,
  Members extends EndpointMemberParameters<
    Endpoints,
    { [key in keyof Endpoints]: EndpointMemberRelated }
  > = EndpointMemberParameters<
    Endpoints,
    { [key in keyof Endpoints]: EndpointMemberRelated }
  >,
> = (EmptyObject<Action['body']> extends true
  ? {}
  : IsRecordContainingAnyRequiredFields<Action['body']> extends false
  ? { body: Action['body'] }
  : { body?: Action['body'] }) &
  (EmptyObject<Action['query']> extends true
    ? {}
    : IsRecordContainingAnyRequiredFields<Action['query']> extends false
    ? { query: Action['query'] }
    : { query?: Action['query'] }) &
  (EmptyObject<PathParams> extends true ? {} : { params: PathParams });

export type ClassBuilder<
  Members extends EndpointMemberParameters<
    Endpoints,
    { [key in keyof Endpoints]: EndpointMemberRelated }
  >,
  Endpoints extends EndpointMember,
  _Base = Base,
> = _Base & {
  [Tkey in keyof Endpoints]: (
    opts: OptionsExtract<Members[Tkey], Endpoints[Tkey]['path']>,
  ) => Promise<Members[Tkey]['return']>;
};
//#endregion

//#region GENERAL RETURN TYPES
export type BaseReturn<Data extends Record<string, any> = never> = Prettify<
  { status: boolean; message: string } & (Data extends never ? undefined : Data)
>;
export type DataReturn<Data extends any> = Prettify<{ data: Data }>;
//#endregion

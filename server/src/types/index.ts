export interface TypedRequestBody<T> extends Express.Request {
  body: T
};
export interface TypedResponseBody<T> extends Express.Response {
  body: T
};

export enum GeneratorTypeEnum {
  Axios = 'axios',
  Fetch = 'fetch'
};

export type GeneratedClientDataType = {
  spec: string;
  version: string;
  name: string;
  directory: string;
  type: GeneratorTypeEnum;
};

export enum NamingEnum {
  camelCase = 'camelCase',
  PascalCase = 'PascalCase',
  snake_case = 'snake_case',
  UPPERCASE = 'UPPERCASE',
  original = 'original'
}

export type GenerateFormValueType = {
  type: GeneratorTypeEnum;
  apiNameSuffix?: string;
  modelNamePrefix?: string;
  modelNameSuffix?: string;
  npmName?: string;
  paramNaming: NamingEnum;
  modelPropertyNaming: NamingEnum;
  enumPropertyNaming: NamingEnum;
  enumNameSuffix?: string;
  stringEnums: boolean;
  sortParamsByRequiredFlag: boolean;
  sortModelPropertiesByRequiredFlag: boolean;
  withInterfaces: boolean;
};
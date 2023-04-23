export type SpecListResponseType = {
  list: string[];
};

export type SwaggerFileData = {
  fileName?: string;
};

export enum GeneratorTypeEnum {
  Axios = 'axios',
  Fetch = 'fetch'
}

export enum NamingEnum {
  camelCase = 'camelCase',
  PascalCase = 'PascalCase',
  snake_case = 'snake_case',
  UPPERCASE = 'UPPERCASE',
  original = 'original'
}
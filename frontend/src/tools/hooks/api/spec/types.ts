export type SpecDataType = {
  spec: string,
  title?: string,
  version?: string
};

export type SpecListResponseType = {
  list: SpecDataType[];
};

export type SwaggerFileData = {
  fileName?: string;
  title?: string;
  version?: string;
};
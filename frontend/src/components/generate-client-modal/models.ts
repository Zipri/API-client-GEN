import { GeneratorTypeEnum, NamingEnum } from "@tools/hooks/api/generator/types";

export interface GenerateClientModalProps {
  fileName: string | null;
};

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

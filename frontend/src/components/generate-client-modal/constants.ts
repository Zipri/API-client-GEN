import { GeneratorTypeEnum, NamingEnum } from "@tools/hooks/api/generator/types";
import { GenerateFormValueType } from "./models";

export const defaultFormValue: GenerateFormValueType = {
  type: GeneratorTypeEnum.Axios,
  apiNameSuffix: 'Client',
  modelNamePrefix: 'I',
  modelNameSuffix: '',
  npmName: '#{name}',
  paramNaming: NamingEnum.camelCase,
  modelPropertyNaming: NamingEnum.camelCase,
  enumPropertyNaming: NamingEnum.PascalCase,
  enumNameSuffix: 'Enum',
  stringEnums: true,
  sortParamsByRequiredFlag: true,
  sortModelPropertiesByRequiredFlag: true,
  withInterfaces: true,     
};

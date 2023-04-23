import { GeneratorTypeEnum } from "../generator/types";

export type GeneratedClientDataType = {
  spec: string;
  name: string;
  directory: string;
  type: GeneratorTypeEnum;
  version?: string;
};
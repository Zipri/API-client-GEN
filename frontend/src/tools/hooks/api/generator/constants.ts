import { GeneratorTypeEnum, NamingEnum } from "./types";

export const GeneratorTypeArr = Object.values(GeneratorTypeEnum).map(type => ({
  label: type,
  value: type
}));

export const NamingTypeArr = Object.values(NamingEnum).map(type => ({
  label: type,
  value: type
}));
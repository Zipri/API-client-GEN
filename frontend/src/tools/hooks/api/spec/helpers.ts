import { SpecDataType, SwaggerFileData } from "./types";

export const convertSpecList = (arr: SpecDataType[]): SwaggerFileData[] => arr.map(({ spec, title, version }) => ({
  fileName: spec,
  title,
  version
}));
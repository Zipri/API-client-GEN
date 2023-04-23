import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR } from "../config";
import { GeneratedClientDataType, GeneratorTypeEnum } from "../types";
import fs from 'fs';

export const buildClientData = (name: string, type: GeneratorTypeEnum): GeneratedClientDataType => {
  const directory = type === GeneratorTypeEnum.Axios ? AXIOS_CLIENTS_DIR : FETCH_CLIENTS_DIR;
  const pathPackageJson = directory + name + '/package.json';
  let version = '';
  try {
    const str: string = fs.readFileSync(pathPackageJson, { encoding: 'utf8' });
    const packageJson = JSON.parse(str);
    version = packageJson.version;
  } catch (e: any) {
    console.log(e.message);
  }
  return {
    spec: name + '.json',
    name,
    directory,
    type,
    version
  };
};
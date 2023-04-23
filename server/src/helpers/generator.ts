import { cloneDeep } from 'lodash';
import { SWAGGER_SRC_DIR } from '../config';
import { GenerateFormValueType } from '../types';
import config from './openapitools.json';
import fs from 'fs';

const convertKeyToSnakeCase = (key: string): string => {
  return key.split('').map(char => /[A-Z]/.test(char) ? '-' + char.toLocaleLowerCase() : char).join('');
};

export const converConfigToString = (type: 'axios' | 'fetch', filterProperty: string[] = []) => {

  const convertObjToString = (obj: Record<string, any>, prefix: string = '') => {
    const props = Object.entries(obj).reduce((acc, [key, value]) => {
      const __key = convertKeyToSnakeCase(key);
      if (typeof value === 'object') {
        if (!filterProperty.includes(__key)) 
          acc += convertObjToString(value, ' --' + __key + '='); 
        return acc;
      } else {
        if (!filterProperty.includes(__key)) 
          acc += (prefix || ' --') + __key + '=' + value; 
        return acc;
      }
      
    }, '');
    return props;
  };

  return convertObjToString(config['generator-cli'].generators[type]);
};

export const createNeedleConfig = (configData: GenerateFormValueType, fileName: string) => {
  const {
    type,
    apiNameSuffix,
    modelNamePrefix,
    modelNameSuffix,
    npmName,
    paramNaming,
    modelPropertyNaming,
    enumPropertyNaming,
    enumNameSuffix,
    stringEnums,
    sortParamsByRequiredFlag,
    sortModelPropertiesByRequiredFlag,
    withInterfaces
  } = configData;

  const newConfig = cloneDeep(config);
  // @ts-ignore
  newConfig['generator-cli'].generators = {
    [type]: { ...config['generator-cli'].generators[type] }
  };
  const partConfig = newConfig['generator-cli'].generators[type];
  try {
    const specStr: string = fs.readFileSync(SWAGGER_SRC_DIR + fileName, { encoding: 'utf8' });
    const spec = JSON.parse(specStr);
    if (spec.info.version)
      partConfig.additionalProperties.npmVersion = spec.info.version;
  } catch (e: any) {
    console.log(e.message);
  }

  if (apiNameSuffix !== undefined)
    partConfig.apiNameSuffix = apiNameSuffix;
  if (modelNamePrefix !== undefined)
    partConfig.modelNamePrefix = modelNamePrefix;
  if (modelNameSuffix !== undefined)
    partConfig.modelNameSuffix = modelNameSuffix;

  partConfig.glob = './' + SWAGGER_SRC_DIR + fileName;

  if (npmName !== undefined)
    partConfig.additionalProperties.npmName = npmName;

  if (paramNaming !== undefined)
    partConfig.additionalProperties.paramNaming = paramNaming;

  if (modelPropertyNaming !== undefined)
    partConfig.additionalProperties.modelPropertyNaming = modelPropertyNaming;

  if (enumPropertyNaming !== undefined)
    partConfig.additionalProperties.enumPropertyNaming = enumPropertyNaming;

  if (enumNameSuffix !== undefined)
    partConfig.additionalProperties.enumNameSuffix = enumNameSuffix;

  if (stringEnums !== undefined)
    partConfig.additionalProperties.stringEnums = stringEnums;

  if (sortParamsByRequiredFlag !== undefined)
    partConfig.additionalProperties.sortParamsByRequiredFlag = sortParamsByRequiredFlag;

  if (sortModelPropertiesByRequiredFlag !== undefined)
    partConfig.additionalProperties.sortModelPropertiesByRequiredFlag = sortModelPropertiesByRequiredFlag;

  if (withInterfaces !== undefined)
    partConfig.additionalProperties.withInterfaces = withInterfaces;

  fs.writeFileSync('openapitools.json', JSON.stringify(newConfig));
  return newConfig;
};


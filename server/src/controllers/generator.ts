import fs from 'fs';
import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR, OPENAPI_TEMPLATE_CONFIG, SWAGGER_SRC_DIR } from '../config';
import { RequestHandler } from 'express';
import { execSync } from 'child_process';
import { createNeedleConfig } from '../helpers/generator';
import { GenerateFormValueType, GeneratorTypeEnum, TypedRequestBody } from '../types';
import { logger } from '../helpers/logger';

const generateClient: RequestHandler = async (req: TypedRequestBody<{ fileName: string, configData: GenerateFormValueType }>, res, next) => {
  try {
    const { fileName, configData } = req.body;
    console.log("generate-client");
    const newConfig = createNeedleConfig(configData, fileName, true);
    const pathPackage = (configData.type === GeneratorTypeEnum.Axios ? AXIOS_CLIENTS_DIR : FETCH_CLIENTS_DIR) + fileName.split('.json')[0];

    fs.rmSync(pathPackage, {
      recursive: true,
      force: true
    });

    execSync(`npm run oa:generate:${configData.type}`);

    execSync(`cd ${pathPackage} && npm i`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

    res.send(newConfig);
    next();
  } catch (e: any) {
    console.log('generate-client-error');
    const result = e.stderr || e.stdout ? [...(e.stderr?.split('\n') || []), ...(e.stdout?.split('\n') || [])] : e;
    logger(result, 'generate-client-error');

    res.status(500).send({
      err: result
    }) && next();
  }
};

const generateConfig: RequestHandler = async (req: TypedRequestBody<{ fileName: string, configData: GenerateFormValueType }>, res, next) => {
  try {
    const { fileName, configData } = req.body;
    console.log("generate-config");
    const newConfig = createNeedleConfig(configData, fileName, false);
    fs.writeFileSync(OPENAPI_TEMPLATE_CONFIG, JSON.stringify(newConfig));

    res.status(200).send(newConfig);
    fs.rmSync(OPENAPI_TEMPLATE_CONFIG, {
      recursive: true,
      force: true
    });
    next();
  } catch (e: any) {
    console.log('generate-config-error');
    const result = e.stderr ? e.stderr.split('\n') : e;
    logger(result, 'generate-config-error');

    res.status(500).send({
      err: result
    }) && next();
  }
};

export default {
  generateClient,
  generateConfig
};
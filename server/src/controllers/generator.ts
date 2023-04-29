import fs from 'fs';
import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR, SWAGGER_SRC_DIR } from '../config';
import { RequestHandler } from 'express';
import { execSync } from 'child_process';
import { createNeedleConfig } from '../helpers/generator';
import { GenerateFormValueType, GeneratorTypeEnum, TypedRequestBody } from '../types';
import { logger } from '../helpers/logger';

const generateClient: RequestHandler = async (req: TypedRequestBody<{ fileName: string, configData: GenerateFormValueType }>, res, next) => {
  try {
    const { fileName, configData } = req.body;
    console.log("generate-client");
    const newConfig = createNeedleConfig(configData, fileName);
    const pathPackage = (configData.type === GeneratorTypeEnum.Axios ? AXIOS_CLIENTS_DIR : FETCH_CLIENTS_DIR) + fileName.split('.json')[0];
    
    logger(newConfig, 'generate-client-step-newConfig');
    logger(pathPackage, 'generate-client-step-pathPackage');

    fs.rmSync(pathPackage, {
      recursive: true,
      force: true
    });

    logger('remove old success and start generate', 'generate-client-step');

    execSync(`npm run oa:generate:${configData.type}`);

    logger('generate success and start install-build', 'generate-client-step');

    execSync(`cd ${pathPackage} && npm i`);
    
    logger('build success', 'generate-client-step');
    res.send(newConfig);
    next();
  } catch (e: any) {
    const result = e.stderr ? e.stderr.data.toString() : e;
    logger(result, 'generate-client-error');
    // fs.writeFileSync('log.json', JSON.stringify(result));
    res.sendStatus(500) && res.send(result) && next(e);
  }
}

export default {
  generateClient
};
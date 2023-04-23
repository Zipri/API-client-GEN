import fs from 'fs';
import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR, SWAGGER_SRC_DIR } from '../config';
import { RequestHandler } from 'express';
import { execSync } from 'child_process';
import { createNeedleConfig } from '../helpers/generator';
import { GenerateFormValueType, GeneratorTypeEnum, TypedRequestBody } from '../types';

const generateClient: RequestHandler = async (req: TypedRequestBody<{ fileName: string, configData: GenerateFormValueType }>, res, next) => {
  try {
    const { fileName, configData } = req.body;
    console.log("generate-client");
    const newConfig = createNeedleConfig(configData, fileName);
    const pathPackage = (configData.type === GeneratorTypeEnum.Axios ? AXIOS_CLIENTS_DIR : FETCH_CLIENTS_DIR) + fileName.split('.json')[0];

    fs.rmSync(pathPackage, {
      recursive: true,
      force: true
    });

    execSync(`npm run oa:generate:${configData.type}`);

    execSync(`cd ${pathPackage} && npm i`);
    res.send(newConfig);
    next();
  } catch (e: any) {
    console.log(e.message);
    const result = e.stderr ? e.stderr.data.toString() : e;
    fs.writeFileSync('log.json', JSON.stringify(result));
    res.sendStatus(500) && res.send(result) && next(e);
  }
}

export default {
  generateClient
};
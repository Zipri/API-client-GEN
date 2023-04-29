import fs from 'fs';
import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR, SWAGGER_SRC_DIR } from '../config';
import { UploadedFile } from 'express-fileupload';
import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types';
import { logger } from '../helpers/logger';

const uploadSpec: RequestHandler = async (req, res, next) => {
  try {
    console.log('upload-spec');
    const file = req.files?.file as UploadedFile;
    const { data, name } = file;
    if (!fs.existsSync(SWAGGER_SRC_DIR)){
      fs.mkdirSync(SWAGGER_SRC_DIR);
    }

    file && fs.writeFileSync(SWAGGER_SRC_DIR + name, data);

    res.sendStatus(200);

    next();
  } catch(e: any) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const deleteSpec: RequestHandler = async (req: TypedRequestBody<{ fileName: string }>, res, next) => {
  try {
    const { fileName } = req.body;
    console.log('delete-spec');
    fs.rmSync(SWAGGER_SRC_DIR + fileName);
    const name = fileName.split('.json')[0];
    if (fs.existsSync(FETCH_CLIENTS_DIR + name)) {
      fs.rmSync(FETCH_CLIENTS_DIR + name, {
        recursive: true,
        force: true
      });
    }
    if (fs.existsSync(AXIOS_CLIENTS_DIR + name)) {
      fs.rmSync(AXIOS_CLIENTS_DIR + name, {
        recursive: true,
        force: true
      });
    }

    res.sendStatus(200);

    next();
  } catch(e: any) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const getSpecList: RequestHandler = async (req, res, next) => {
  try {
    console.log('get-spec-list');
    if (!fs.existsSync(SWAGGER_SRC_DIR)) {
      fs.mkdirSync(SWAGGER_SRC_DIR);
    }
    const specList = fs.readdirSync(SWAGGER_SRC_DIR);

    const result = [];
    for (const specName of specList) {
      try {
        const specStr: string = fs.readFileSync(SWAGGER_SRC_DIR + specName, { encoding: 'utf8' });
        const spec = JSON.parse(specStr);
        result.push({
          spec: specName,
          title: spec?.info?.title,
          version: spec?.info?.version
        });
      } catch (e: any) {
        console.log(e.message);
      }
      
    }

    res.send({
      list: result
    });

    next();
  } catch(e: any) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const downloadSpec: RequestHandler = async (req: TypedRequestBody<{ fileName: string }>, res, next) => {
  try {
    const { fileName } = req.body;
    console.log('download-spec');

    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${fileName}`
    });
    fs.createReadStream(SWAGGER_SRC_DIR + fileName, 'binary').pipe(res)

    res.sendStatus(200);

    next();
  } catch(e: any) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

export default {
  uploadSpec,
  getSpecList,
  deleteSpec,
  downloadSpec
};
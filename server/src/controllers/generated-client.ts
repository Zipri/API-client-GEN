import { RequestHandler } from 'express';
import fs from 'fs';
import { zip } from 'zip-a-folder';

import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR } from '../config';
import { buildClientData } from '../helpers/generated-client';
import { GeneratorTypeEnum, TypedRequestBody } from '../types';

/** Получение списка клиентских библиотек из директорий */
const getClientList: RequestHandler = async (req, res, next) => {
    try {
        console.log('getClientList');

        /** Проверка наличия и создание директорий, если необходимо */
        if (!fs.existsSync(FETCH_CLIENTS_DIR)) {
            fs.mkdirSync(FETCH_CLIENTS_DIR);
        }
        if (!fs.existsSync(AXIOS_CLIENTS_DIR)) {
            fs.mkdirSync(AXIOS_CLIENTS_DIR);
        }

        /** Чтение списков клиентских библиотек */
        const [fetchList, axiosList] = await Promise.all([
            fs.readdirSync(FETCH_CLIENTS_DIR),
            fs.readdirSync(AXIOS_CLIENTS_DIR),
        ]);
        console.log(fetchList, axiosList);

        /** Отправка списка клиентов */
        res.send([
            ...fetchList.map((item) =>
                buildClientData(item, GeneratorTypeEnum.Fetch)
            ),
            ...axiosList.map((item) =>
                buildClientData(item, GeneratorTypeEnum.Axios)
            ),
        ]);

        next();
    } catch (e: any) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

/** Удаление клиентской библиотеки по имени и директории */
const deleteClient: RequestHandler = async (
    req: TypedRequestBody<{ name: string; directory: string }>,
    res,
    next
) => {
    try {
        const { name, directory } = req.body;
        console.log('delete-spec');
        fs.rmSync(directory + name, {
            recursive: true,
            force: true,
        });

        res.sendStatus(200);

        next();
    } catch (e: any) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};

/** Создание и отправка zip-архива клиентской библиотеки */
const getClientZip: RequestHandler = async (
    req: TypedRequestBody<{ name: string; directory: string }>,
    res,
    next
) => {
    try {
        const { name, directory } = req.body;
        const folderPath = directory + name;
        const filePath = folderPath + '.zip';
        if (fs.existsSync(filePath))
            fs.rmSync(filePath, {
                recursive: true,
                force: true,
            });
        await zip(folderPath, filePath);

        console.log('get-client-zip');

        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${name}.zip`,
        });
        fs.createReadStream(filePath, 'binary')
            .pipe(res)
            .on('close', () => {
                fs.rmSync(filePath, {
                    recursive: true,
                    force: true,
                });
            });

        next();
    } catch (e: any) {
        console.log(e, e.message);
        res.sendStatus(500) && next(e);
    }
};

export default {
    getClientList,
    deleteClient,
    getClientZip,
};

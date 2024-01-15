import { AXIOS_CLIENTS_DIR, FETCH_CLIENTS_DIR } from '../config';
import { GeneratedClientDataType, GeneratorTypeEnum } from '../types';
import fs from 'fs';

/**
 * Создает объект данных о клиентской библиотеке.
 * @param name Имя библиотеки.
 * @param type Тип генератора (Axios или Fetch).
 * @returns Объект с данными о клиентской библиотеке.
 */
export const buildClientData = (
    name: string,
    type: GeneratorTypeEnum
): GeneratedClientDataType => {
    // Определение директории на основе типа генератора
    const directory =
        type === GeneratorTypeEnum.Axios
            ? AXIOS_CLIENTS_DIR
            : FETCH_CLIENTS_DIR;
    const pathPackageJson = directory + name + '/package.json';
    let version = '';

    try {
        /** Формирование версии из файла package.json */
        const str: string = fs.readFileSync(pathPackageJson, {
            encoding: 'utf8',
        });
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
        version,
    };
};

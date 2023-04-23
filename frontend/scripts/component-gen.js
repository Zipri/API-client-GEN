// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const capitalize = ([first, ...rest]) => [first.toUpperCase(), ...rest].join('');
const lowerCase = ([first, ...rest]) => [first.toLowerCase(), ...rest].join('');
const camelCase = name =>
  [...name.split('-')].map((i, j) => (j > 0 ? capitalize(i) : i.toLowerCase())).join('');
const title = name => [...name.split('-')].map(i => capitalize(i)).join('');
const _t = '  ';
const sass = name => {
  return `.${camelCase(name)} {\n${_t}\n}`;
};

const rsc = name => {
  let fn = `import React, { FC } from 'react';\n`;
  fn += `import { ${name}Props } from './models';\n`;
  fn += `import cl from './${name}.module.scss';\n\n`;
  fn += `const ${name}: FC<${name}Props> = ({prop}) => {\n`;
  fn += `${_t}return (\n${_t}${_t}<div className={cl.${lowerCase(
    name
  )}}>{prop}</div>\n${_t});\n};\n\n`;
  fn += `export { ${name} };`;
  return fn;
};

const types = name => {
  let fn = `export interface ${name}Props {\n${_t}prop?: string;\n}\n\n`;
  return fn;
};

const indexFile = name => {
  return `export * from './${name}';`;
};

(() => {
  // eslint-disable-next-line no-undef
  let name = process?.argv[process?.argv?.length - 1];
  if (name) {
    const split = name.split('/');
    const dirPath =
      Array.isArray(split) && split?.length === 1 ? `./src/components/${name}` : `./src/${name}`;

    const nameSplit = name.split('/');
    name = Array.isArray(nameSplit) ? nameSplit[nameSplit.length - 1] : name;
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    fs.writeFileSync(dirPath + '/' + title(name) + '.module.scss', sass(name));
    fs.writeFileSync(dirPath + '/models.ts', types(title(name)));
    const cName = dirPath + '/' + title(name) + '.tsx';
    fs.writeFileSync(cName, rsc(title(name)));
    fs.writeFileSync(dirPath + '/' + 'index.ts', indexFile(title(name)));
  }
})();

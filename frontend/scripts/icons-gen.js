// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const path = '../svg/icons';

const capitalize = ([first, ...rest]) => [first.toUpperCase(), ...rest].join('');
const formatName = name =>
  [
    ...name
      .split('.')[0]
      .split('-')
      .map(i => capitalize(i))
  ].join('');
const generate = () => {
  const files = fs.readdirSync('./src/assets/svg/icons');
  let jsFn = '\n/// GENERATED (DO NOT MODIFY)\n\n\n';
  if (!files?.length) return;
  const imports = files.map(f => `import ${formatName(f)} from '${path + '/' + f}';`);
  const keys = files.map(f => `\t['${f.split('.')[0]}']: ${formatName(f)}`);
  jsFn += [...imports].join('\n');
  jsFn += `\n\nexport const iconsResource = {\n${[...keys].join(',\n')}\n};`;
  const types = [...files.map(f => `'${f.split('.')[0]}'`)].join(' | ');
  jsFn += `\n\nexport type IconType = ${types};`;

  fs.writeFileSync('./src/assets/resources/icons.ts', jsFn);
};

generate();

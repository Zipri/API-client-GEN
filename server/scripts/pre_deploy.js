// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const generate = () => {
  fs.copyFileSync('./package.json', '../dist/server/package.json');
  fs.copyFileSync('./.htaccess', '../dist/.htaccess');
};

generate();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { log } = require('console');
const fs = require('fs');

const clear = () => {
  
  const check = fs.readdirSync('../openapiAxiosClients');
  console.log(check);
  fs.rmSync('../openapiAxiosClients', { recursive: true });
  fs.rmSync('../openapiFetchClients', { recursive: true });
};

clear();

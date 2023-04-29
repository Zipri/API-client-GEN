import fs from 'fs';
const LOG = 'log.json';
export const logger = (
  data: Record<string, any> | string,
  title?: string
) => {
  const logStr: string = fs.readFileSync(LOG, { encoding: 'utf8' });
  const newLog = logStr + "\n\r"  + "\n\r" 
    + (new Date().toISOString()) + "\n\r" 
    + (title ? title + "\n\r" : '')
    + (typeof data === 'string' ? data : JSON.stringify(data));
  fs.writeFileSync('log.json', newLog);
};
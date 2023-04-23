export const SERVER_URL = (
  /:\d+$/.test(window.location.origin) ?
  window.location.origin.split(':').slice(0, -1).join(':') 
  : window.location.origin
) + ':5000/api';

export const API_URL = {
  spec: SERVER_URL + '/spec',
  generator: SERVER_URL + '/generator',
  generatedClient: SERVER_URL + '/generated-client',
};
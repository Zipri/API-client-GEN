export const SERVER_URL = window.location.origin.split(':').slice(0, -1).join(':') + ':5000/api';

export const API_URL = {
  spec: SERVER_URL + '/spec',
  generator: SERVER_URL + '/generator',
  generatedClient: SERVER_URL + '/generated-client',
};
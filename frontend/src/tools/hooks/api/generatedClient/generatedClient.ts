import { API_URL } from "@config";
import axios from "axios";
import { useEffect, useState } from "react";
import { GeneratedClientDataType } from "./types";
import { binaryToBlob, downloadFileByBlob } from "@tools/blob";


export const useGeneratedClientApi = () => {
  const [clientList, setClientList] = useState<GeneratedClientDataType[]>([]);
  const [clientListLoading, setClientListLoading] = useState<boolean>(false);

  const getClientList = async (): Promise<GeneratedClientDataType[]> => {
    try {
      setClientListLoading(true);
      const response = await axios.get<GeneratedClientDataType[]>(API_URL.generatedClient + '/client-list');
      setClientList(response.data);
      setClientListLoading(false);
      return response.data;
    } catch (error) {
      setClientListLoading(false);
      return [];
    }
  };

  const deleteClient = async (data: Omit<GeneratedClientDataType, 'type' | 'spec'>) => {
    try {
      const response = await axios.post(API_URL.generatedClient + '/delete-client', data);
      getClientList();
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const getClientZip = async (data: Omit<GeneratedClientDataType, 'spec'>) => {
    try {
      const response = await axios.post(API_URL.generatedClient + '/client-zip', data);

      // let l = response.data.length,
      //   d: string = response.data,
      //   array = new Uint8Array(l);

      // for (let i = 0; i < l; i++){
      //   array[i] = d?.charCodeAt(i);
      // }

      const blob = binaryToBlob(response.data);
      //new Blob([array], {type: 'application/octet-stream'});

      downloadFileByBlob(blob, data.name + '-' + data.type + '.zip', 200, true);

      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getClientList();
  }, []);

  return {
    getGeneratedClientList: getClientList,
    getGeneratedClientZip: getClientZip,
    deleteGeneratedClient: deleteClient,
    clientList,
    clientListLoading
  };
};
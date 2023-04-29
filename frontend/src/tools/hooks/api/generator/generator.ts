import { API_URL } from "@config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { SwaggerFileData } from "../spec/types";
import { GenerateFormValueType } from "@components/generate-client-modal/models";
import { downloadFileByBlob } from "@tools/blob";
import { ErrorResponseType } from "../types";


export const useGeneratorApi = () => {
  const [specList, setSpecList] = useState<SwaggerFileData[]>([]);
  const [specListLoading, setSpecListLoading] = useState<boolean>(false);

  const generateBySpec = async (fileName: string, configData: GenerateFormValueType): Promise<boolean | ErrorResponseType> => {
    try {
      const response = await axios.post(API_URL.generator + '/generate-client', {
        fileName,
        configData
      });
      return response.status === 200;
    } catch (error: any) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response);
        return error.response.data as ErrorResponseType;
      }
      return false;
    }
  };

  const generateConfigBySpec = async (fileName: string, configData: GenerateFormValueType): Promise<boolean> => {
    try {
      const response = await axios.post(API_URL.generator + '/generate-config', {
        fileName,
        configData
      });
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json'});
      downloadFileByBlob(blob, fileName.split('.json')[0] + '_openpai_config.json', 200, true);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  return {
    generateBySpec,
    generateConfigBySpec
  };
};
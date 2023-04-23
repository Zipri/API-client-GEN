import { API_URL } from "@config";
import axios from "axios";
import { useEffect, useState } from "react";
import { GeneratorTypeEnum } from "./types";
import { SwaggerFileData } from "../spec/types";
import { GenerateFormValueType } from "@components/generate-client-modal/models";


export const useGeneratorApi = () => {
  const [specList, setSpecList] = useState<SwaggerFileData[]>([]);
  const [specListLoading, setSpecListLoading] = useState<boolean>(false);

  const generateBySpec = async (fileName: string, configData: GenerateFormValueType): Promise<boolean> => {
    try {
      const response = await axios.post(API_URL.generator + '/generate-client', {
        fileName,
        configData
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  return {
    generateBySpec,
  };
};
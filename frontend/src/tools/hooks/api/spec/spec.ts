import { API_URL, SERVER_URL } from "@config";
import { RcFile } from "antd/es/upload";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { SpecListResponseType, SwaggerFileData } from "./types";
import { convertSpecList } from "./helpers";
import { binaryToBlob, downloadFileByBlob } from "@tools/blob";
import { ErrorResponseType } from "../types";

export const useSpecApi = () => {
  const [specList, setSpecList] = useState<SwaggerFileData[]>([]);
  const [specListLoading, setSpecListLoading] = useState<boolean>(false);

  const uploadSpec = async (file: RcFile): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('file', file as File);
      const response = await axios.post(API_URL.spec + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      getSpecList();
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const deleteSpec = async (fileName: string): Promise<boolean> => {
    try {
      const response = await axios.post(API_URL.spec + '/delete', { fileName });
      getSpecList();
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const downloadSpec = async (fileName: string): Promise<boolean> => {
    try {
      const response = await axios.post(API_URL.spec + '/download', { fileName });
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json'});
      downloadFileByBlob(blob, fileName, 200, true);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const getSpecList = async (): Promise<SwaggerFileData[] | undefined> => {
    try {
      setSpecListLoading(true);
      const response = await axios.get<SpecListResponseType>(API_URL.spec + '/list');
      const convertedList = convertSpecList(response.data.list)
      setSpecList(convertedList);
      return convertedList;
    } finally {
      setSpecListLoading(false);
      return undefined;
    }
  };

  const validateSpec = async (fileName: string): Promise<ErrorResponseType> => {
    try {
      const response = await axios.post(API_URL.spec + '/validate', { fileName });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response);
        return error.response.data as ErrorResponseType;
      }
      return {
        err: ['Unknow error']
      };
    }
  };

  useEffect(() => {
    getSpecList();
  }, []);

  return {
    uploadSpec,
    getSpecList,
    deleteSpec,
    downloadSpec,
    validateSpec,
    specList,
    specListLoading
  };
};
import { SERVER_URL } from "@config";
import { RcFile } from "antd/es/upload";
import axios from "axios";

export const uploadFile = async (__file: RcFile) => {
  try {
    const formData = new FormData();
    formData.append('file', __file as File);
    const response = await axios.post(SERVER_URL + '/upload-spec', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
  
};
import { AxiosResponse } from "axios";

export interface ResponseTypes extends AxiosResponse  {
  response: any;
  success: boolean;
  message: string;
};

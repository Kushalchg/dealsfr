import { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from "axios";

type ValuesArray = [number, number, number] | [number, number, number, number];

export interface LayoutItem {
  id?: number;
  name: string;
  layout_array: ValuesArray;
  store: number;
}

export interface LayoutCreatePayload {
  name: string;
  layout_array: ValuesArray;
  store: number;
}

export interface LayoutCreateResponse {
  data: LayoutItem[];
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<any>;
  request?: any;
}

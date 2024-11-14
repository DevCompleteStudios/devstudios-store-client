import { IResponse } from "./IResponse";


export interface IResponsePagination<T> extends IResponse<T> {
  maxPage: number;
  allCountElements: number;
}


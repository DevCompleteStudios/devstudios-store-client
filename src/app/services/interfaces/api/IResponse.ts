

export interface IResponse<T> {
  status: number;
  token?: string;
  data: T;
  date: Date;
}

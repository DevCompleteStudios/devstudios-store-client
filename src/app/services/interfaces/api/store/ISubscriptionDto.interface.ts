import { IDto } from "../IDto";


export interface ISubscriptionDto extends IDto {
  content: string[];
  daysDuration: number;
  name: string;
  description: string;
  price: number
}


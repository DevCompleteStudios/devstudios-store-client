

export type methodPayment = 'SUBSCRIPTION_AND_ONE_PAYMENT' | 'SUBSCRIPTION' | 'ONE_PAYMENT' | 'DEVELOPMENT' | 'MAINTENANCE' | 'UPDATING';

export interface IScriptDto {
  name:string;
  id: number;
  description:string;
  isActive: boolean;
  methodPayment: methodPayment;
  youtubeLink?: string;
  image: string;
  price: number;
  createdAt: Date;
  purchases: number;
  ratings: any[];
  updatedAt: Date;
}

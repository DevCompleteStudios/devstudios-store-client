

export type methodPayment = 'SUBSCRIPTION_AND_ONE_PAYMENT' | 'SUBSCRIPTION' | 'ONE_PAYMENT' | 'DEVELOPMENT' | 'MAINTENANCE' | 'UPDATING';

export interface IScriptPreviewDto {
  name: string;
  id: number;
  description:string;
  isActive: Boolean;
  price: number;
  methodPayment:methodPayment;
  image: string;
}

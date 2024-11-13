

export interface IPurchase {
  name: string;
  link: string;
  amount: number;
  orderId:string;
  key: string;
  isActive: Boolean;
  dateExpired?: Date;
}


import { IKey } from "./IKey.interface";
import { ISubscriptionPreviewDto } from "./ISubscriptionPreviewDto";


export interface ISubscriptionPurchaseDto {
  dateExpired: Date;
  dateAvailableForNewUser:Date;
  uuid: string;
  key: IKey;
  subscription: ISubscriptionPreviewDto;
  amount: number;
  isActive: boolean;
}


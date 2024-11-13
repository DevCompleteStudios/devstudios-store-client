import { IRoleDto } from "../roles/IRoleDto";
import { IScriptPurchase } from "../store/IScriptPurchase.interface";
import { ISubscriptionPurchaseDto } from "../store/ISubscriptionPurchaseDto";


export interface IUserDto {

  email: string;
  role: IRoleDto[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  scriptsPurchases: IScriptPurchase[];
  subscriptionsPurchases: ISubscriptionPurchaseDto[];

}


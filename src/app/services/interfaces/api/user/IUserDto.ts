import { IRoleDto } from "../roles/IRoleDto";


export interface IUserDto {

  email: string;
  role: IRoleDto[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  scriptsPurchases: any[];
  subscriptionsPurchases: any[];

}


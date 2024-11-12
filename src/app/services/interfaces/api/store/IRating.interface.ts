import { IDto } from "../IDto";
import { IUserPreview } from "../user/IUserPreview.interface";


export interface IRating extends IDto {
  stars:number;
  content: string;
  user: IUserPreview;
}


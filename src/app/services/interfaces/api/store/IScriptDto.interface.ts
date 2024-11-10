import { IScriptPreviewDto } from "./IScriptPreviewDto.interface";


export interface IScriptDto extends IScriptPreviewDto {

  createdAt: Date;
  updatedAt: Date;
  ratings: any[];
  getPurchases: any[];
  youtubeLink: string;

}


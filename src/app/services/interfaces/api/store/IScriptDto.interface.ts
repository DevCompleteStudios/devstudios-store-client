import { IRating } from "./IRating.interface";
import { IScriptPreviewDto } from "./IScriptPreviewDto.interface";


export interface IScriptDto extends IScriptPreviewDto {

  createdAt: Date;
  updatedAt: Date;
  ratings: IRating[];
  purchases: any[];
  youtubeLink: string;

}


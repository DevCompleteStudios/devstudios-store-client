import { IRatingPreview } from "./IRatingPreview.interface";
import { IScriptPreviewDto } from "./IScriptPreviewDto.interface";


export interface IScriptDto extends IScriptPreviewDto {

  createdAt: Date;
  updatedAt: Date;
  ratings: IRatingPreview[];
  purchases: any[];
  youtubeLink: string;
  scriptText: string;

}


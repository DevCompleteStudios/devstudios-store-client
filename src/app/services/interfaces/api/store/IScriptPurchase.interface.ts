import { IKey } from "./IKey.interface";
import { IScriptPreviewDto } from "./IScriptPreviewDto.interface";


export interface IScriptPurchase {
  uuid:string;
  key: IKey;
  script: IScriptPreviewDto;
}


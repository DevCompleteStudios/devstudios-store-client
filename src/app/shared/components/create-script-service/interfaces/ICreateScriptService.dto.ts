import { methodPayment } from "../../../../services/interfaces/api/store/IScriptPreviewDto.interface";



export interface ICreateScriptServiceDto {
    name: string;
    description: string;
    price: number;
    image: File;
    methodPayment: methodPayment;
    youtubeLink: string;
}


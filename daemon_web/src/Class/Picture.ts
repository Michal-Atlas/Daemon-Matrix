import {Tag} from "./Tag";

export interface Picture{
    id: number;
    uri: string;
    tags: Tag[];    
}
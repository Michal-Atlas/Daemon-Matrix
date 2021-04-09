import {Picture} from "./Picture";

export interface Tag {
    id: number;
    name: string;
    pictures: Picture[];
    subTags: Tag[];
}

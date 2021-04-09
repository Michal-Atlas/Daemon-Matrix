import {Picture} from "../Class/Picture";
import {Tag} from "../Class/Tag";
import React from "react";
import axios from "axios";
import './PixCard.scss';
import TagSpan from "./TagSpan";

const PixCard = (props: {picBare: Picture, lastag: Tag, SetLastTag: any}) => {
    const [picture, SetPicture] = React.useState(props.picBare);
        
    return(
        <div className='PixCard col'>
            <div className='card'>
                <a href={"/pix/"+picture.id}>
                        <img title={picture.uri} className='card-img-top img-fluid' src={picture.uri}
                              alt={picture.uri}/>
                </a>
                <div className='card-body'>
                    <TagSpan picture={picture} lastag={props.lastag} SetLastTag={props.SetLastTag}/>
                </div>
            </div>
        </div>
    );
}

export default PixCard;

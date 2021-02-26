import {Picture} from "../Class/Picture";
import {Tag} from "../Class/Tag";
import React from "react";
import axios from "axios";
import './PixCard.scss';

const PixCard = (props: {picBare: Picture}) => {
    const [picture, SetPicture] = React.useState(props.picBare);
    const [base64pic, SetBase64Pic] = React.useState("");
    const [openTagMenu, SetOpenTagMenu] = React.useState(false);
    const [tags, SetTags] = React.useState<Tag[]>([]);
    React.useEffect(() => {
        
        axios.get("Picture?picId="+props.picBare.id).then(
            (res: any) => SetPicture(res.data)
        ).catch(console.error)
        
        axios.get("Picture/Base64?picId="+picture.id).then(
            (result: any) => SetBase64Pic(result.data)
        ).catch(console.error);
        
        axios.get("Tag/All").then(
            (res: any) => SetTags(res.data)
        ).catch(console.error);
            
    }, [picture, base64pic]);

    function RemoveTag(picId: number, tagId: number) {
        axios.delete(`Tag?tagId=${tagId}&picId=${picId}`);
    }
    function AddTag(picId: number, tagId: number) {
        axios.post(`Tag?tagId=${tagId}&picId=${picId}`);
    }

    return(
        <div className='PixCard col'>
            <div className='card'>
                <a rel='noreferrer' target='_blank' href={"data:image/png;base64,"+base64pic}>
                    <img title={picture.filename} className='card-img-top img-fluid' src={"data:image/png;base64,"+base64pic} alt={picture.filename}/>
                </a>
                <div className='card-body'>
                    <p className='card-text'>
                        {picture.tags && picture.tags.map((t:Tag) => <span key={t.id} className='tag-button badge bg-primary text-light' onClick={() => RemoveTag(picture.id, t.id)}>{t.name}</span>)}
                        {<span onClick={() => SetOpenTagMenu(!openTagMenu)} className='addtag-button badge bg-primary text-light'>{openTagMenu?'-':'+'}</span>}
                    </p>
                    { openTagMenu &&
                        
                            <p>
                                {tags && tags.map(t=> !picture.tags.includes(t) && <span key={t.id} className='tag-button badge bg-danger text-light' onClick={() => AddTag(picture.id, t.id)}>{t.name}</span>)}
                            </p>
                        
                    }
                </div>
            </div>
        </div>
    );
}

export default PixCard;
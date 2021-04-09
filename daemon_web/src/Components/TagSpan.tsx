import {Tag} from "../Class/Tag";
import React from "react";
import axios from "axios";
import {Picture} from "../Class/Picture";
import './TagSpan.scss';

const TagSpan = (props: {picture: Picture, lastag: Tag, SetLastTag: any}) => {
    const [picture, SetPicture] = React.useState(props.picture);
    const [tags, SetTags] = React.useState<Tag[]>([]);
    const [triggerReload, SetTriggerReload] = React.useState(0);
    const [openTagMenu, SetOpenTagMenu] = React.useState(false);
    React.useEffect(() => {
            axios.get<Picture>("/Picture?picId="+picture.id).then(
                res => SetPicture(res.data)
            ).catch(console.error);

            axios.get<Tag[]>("/Tag/All").then(
                res => SetTags(res.data)
            ).catch(console.error);}
            
        ,[openTagMenu, triggerReload]);

    return(
        <div className={'TagSpan'}>
        <p className='card-text'>
            {picture.tags && picture.tags.sort((x,y)=>x.name>y.name?1:-1).map((t:Tag) => <span key={t.id} className='tag-button badge bg-primary text-light' onClick={() => RemoveTag(picture.id, t.id)}>{t.name}</span>)}
            {props.lastag.id != -1 && <span key={props.lastag.id} className='tag-button badge bg-danger text-light' onClick={() => AddTag(picture.id, props.lastag.id)}>&#8635;</span> }
            {<span onClick={() => SetOpenTagMenu(!openTagMenu)} className='addtag-button badge bg-primary text-light'>{openTagMenu?'-':'+'}</span>}
        </p>
    { openTagMenu &&
    <p>
        {tags && tags.map(t=> !picture.tags.includes(t) && <span key={t.id} className='tag-button badge bg-danger text-light' onClick={() => {AddTag(picture.id, t.id); props.SetLastTag(t);}}>{t.name}</span>)}
    </p>
    }
    </div>
    );

    function RemoveTag(picId: number, tagId: number) {
        axios.delete(`/Tag?tagId=${tagId}&picId=${picId}`).catch(console.error);
        SetTriggerReload(triggerReload+1);
    }
    function AddTag(picId: number, tagId: number) {
        axios.post(`/Tag?tagId=${tagId}&picId=${picId}`).catch(console.error);
        SetTriggerReload(triggerReload+1);
    }
    
}

export default TagSpan;

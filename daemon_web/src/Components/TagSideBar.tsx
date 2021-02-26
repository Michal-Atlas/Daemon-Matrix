import axios from "axios";
import {Tag} from "../Class/Tag";
import React from "react";
import './TagSideBar.scss';

export const TagSideBar = (props: {tagSetter: any, selectedTag: number}) => {
    const [tags, SetTags] = React.useState<Tag[]>([]);
    React.useEffect(()=>{
        axios.get("Tag/All").then(
            (res: any) => SetTags(res.data)
        ).catch(console.error);
    }, []);
    
    return(<div className='TagSideBar '><div className='ShowSidebar' /><ul className='list-group'>
            { tags ? tags?.map((t:Tag) => 
                <li key={t.id} className={props.selectedTag === t.id ? 'list-group-item active' : 'list-group-item'} onClick={() => props.tagSetter(t.id)}>{t.name}</li>
            ) : "Loading..."}</ul></div>);
}

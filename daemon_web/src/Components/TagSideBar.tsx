import axios from "axios";
import {Tag} from "../Class/Tag";
import React from "react";
import './TagSideBar.scss';
import Auth from "./Auth";
import Cookies from "universal-cookie";
import {useParams} from "react-router";

export const TagSideBar = () => {
    const { tagId } = useParams<{tagId: string}>();
    const [tags, SetTags] = React.useState<Tag[]>([]);
    React.useEffect(()=>{
        axios.get<Tag[]>("/Tag/All").then(
            res => SetTags(res.data)
        ).catch(console.error);
    }, []);
    
    return(<div className='TagSideBar'><div className='ShowSidebar text-light'><b>&#35;</b></div><ul className='list-group'>
            <li><Auth/></li>
            { tags ? tags.map(t => 
                <a key={t.id} href={"/tags/"+t.id}><li className={tagId === t.id.toString() ? 'list-group-item active' : 'list-group-item'}>{t.name}</li></a>
            ) : "Loading..."}</ul>
    </div>);
}

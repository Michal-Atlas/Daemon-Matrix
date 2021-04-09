import React from "react";
import axios from "axios";
import {Tag} from "../Class/Tag";
import AddTag from "../Components/AddTag";
import './TagManagement.scss';
import Auth from "../Components/Auth";

const TagList = () => {
    const [tags, SetTags] = React.useState<Tag[]>();
    const [affirm, SetAffirm] = React.useState(false);
    React.useEffect(()=>{
        axios.get<Tag[]>('/Tag/All').then(res => SetTags(res.data)).catch(console.error);
    },[]);
    
    function DeleteTag(tagId: number){
        axios.delete(`/Tag/Edit?tagId=${tagId}`).catch(console.error);
        document.location.reload();
    }
    
    return(
        <>
            <br/><br/><br/>
            <Auth/>
        <a className={'back-button btn btn-primary'} href={"/"}>Back</a>
        <br/><br/>
            <table className={'table'}>
            <thead>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th>SubTags</th>
                <th>Manage</th>
            </thead>
            <tbody>
                {tags && tags.map(tag => 
                    <tr key={tag.id}>
                        <td>{tag.id}</td>
                        <td>{tag.name}</td>
                        <td>{tag.subTags.map(x => <p>{x.name}</p>)}</td>
                        <td><button onClick={() => { affirm ? DeleteTag(tag.id) : SetAffirm(true) } } className={'btn '+(affirm ? 'btn-warning':'btn-danger')}>{affirm?'SURE?':'DELETE'}</button></td>
                    </tr>
                )}
                <tr>
                    <AddTag/>
                </tr>
            </tbody>
        </table>
        </>
    );
}

export default TagList;
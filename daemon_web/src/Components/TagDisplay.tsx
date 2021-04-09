
import {Picture} from "../Class/Picture";
import axios from "axios";
import PixCard from "../Components/PixCard";
import {Tag} from "../Class/Tag";
import './TagDisplay.scss';
import React from "react";
import {useParams} from "react-router";

const TagDisplay = () => {
    let picLimit = 100;
    const { tagId } = useParams<{tagId: string}>();
    const [pictures, SetPictures] = React.useState<Picture[]>([]);
    const [lastag, SetLastTag] = React.useState<Tag>({id: -1, name: "", pictures:[], subTags:[]});
    const [page, SetPage] = React.useState(1);
    const [title, SetTitle] = React.useState("Daemon Matrix");
    React.useEffect(() => {
                axios.get<Picture[]>("/Tag/Pictures?tagId="+tagId).then(
                    result =>
                        SetPictures(result.data)
                ).catch(console.error);
                axios.get<string>("/Tag/Name?tagId="+tagId).then(
                    result =>
                        SetTitle(result.data)
                ).catch(console.error);
        }, [tagId]);
    document.title = title;
    return(
            <div className='TagDisplay container'>
                <h1>{title}</h1><hr/>
                <div className='row row-cols-auto'>
                    {pictures ? pictures.slice((page-1)*picLimit,page*picLimit).map((p: Picture) => <PixCard key={p.id} picBare={p} lastag={lastag} SetLastTag={SetLastTag} />) : "Loading..."}
                </div>
                <br/>
                <div className={'page-nav-menu'}>
                    <button className={'btn btn-primary'} onClick={() => SetPage(page-1)}>&#129044;</button>
                    <button disabled={true} className={'btn btn-danger text-light'}>{page}</button>
                    <button className={'btn btn-primary'} onClick={() => SetPage(page+1)}>&#129046;</button>
                    <a className={'btn btn-primary'} href={"/tags"}>&#10050;</a>
                    <a className={'btn btn-primary'} href={"/add"}>+</a>
                </div>
            </div>
    );
};

export default TagDisplay;

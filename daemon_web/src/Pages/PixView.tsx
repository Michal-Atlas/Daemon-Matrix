import PixCard from "../Components/PixCard";
import { Tag } from '../Class/Tag';
import React from "react";
import axios from "axios";
import { Picture } from "../Class/Picture";
import { useParams } from 'react-router';
import TagSpan from "../Components/TagSpan";
import './PixView.scss';

const PixView = () => {
    const { picId } = useParams<{ picId: string }>();

    const [picture, SetPicture] = React.useState<Picture>();
    const [affirm, SetAffirm] = React.useState(false);

    React.useEffect(() => {
        axios.get<Picture>("/Picture?picId=" + picId).then(
            res => SetPicture(res.data)
        ).catch(console.error);
    }, []);
    const [lastag, SetLasttag] = React.useState({ id: -1, name: "", pictures: [], subTags: [] });
    if (picture) { document.title = picture.uri }
    return (<div className={'PixView'}>
        {picture &&
            <a rel='noreferrer' target='_blank' href={picture.uri}>
                {picture.uri.includes(".vid") ?
                    <video controls preload={'metadata'} title={picture.uri} src={picture.uri} /> :
                    <img title={picture.uri} src={picture.uri}
                        alt={picture.uri} />
                }
            </a>
        }
        {picture && <TagSpan picture={picture} lastag={lastag} SetLastTag={SetLasttag} />}
        {picture && <button onClick={() => { affirm ? DeletePix() : SetAffirm(true) }} className={'btn ' + (affirm ? 'btn-warning' : 'btn-danger')}>{affirm ? 'SURE?' : 'DELETE'}</button>}
    </div>);
    function DeletePix() {
        axios.delete("/Picture", {
            params: { picId: picture?.id }
        }).catch(console.error).then(() => window.history.length == 1 ? document.location.assign("/") : window.history.back());
    }
}

export default PixView;

import React from "react";
import {Picture} from "../Class/Picture";
import axios from "axios";
import PixCard from "./PixCard";

const TagDisplay = (props: {tagId: number}) => {
    const [pictures, SetPictures] = React.useState<Picture[]>([]);
    
    React.useEffect(() => {
                axios.get("Tag/Pictures?tagId="+props.tagId).then(
                    (result: any) =>
                        SetPictures(result.data)
                ).catch(console.error);
        }, [props.tagId]);
    return(
            <div className='TagDisplay container'>
                <div className='row row-cols'>
                    {pictures ? pictures?.map((p: Picture) => <PixCard key={p.id} picBare={p} />) : "Loading..."}
                </div>
            </div>
    );
};

export default TagDisplay;

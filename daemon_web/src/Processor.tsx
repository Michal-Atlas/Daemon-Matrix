import React from "react";
import axios from "axios";
import PixCard from "./Components/PixCard";
import {Picture} from "./Class/Picture";
import {Tag} from "./Class/Tag";

const Processor = () => {
    const [selec, SetSelec] = React.useState(0);
    const [picture, SetPicture] = React.useState<Picture>();
    const [formCont, SetFormCont] = React.useState("");
    const [tags, SetTags] = React.useState<Tag[]>();
    
    React.useEffect(()=>{
        axios.get("Picture/unprocessed").then(
            (pid: any) => SetSelec(pid.data)
        ).catch(console.error);
        axios.get("Picture?picId="+selec).then(
            (p: any) => SetPicture(p.data)
        ).catch(console.error);
        axios.get("Tag/All").then(
            (p: any) => SetTags(p.data)
        ).catch(console.error);
    },[selec]);
    
    return(
        <>
            <h2>[{selec}]</h2>
                
            {picture && <PixCard picBare={picture} />}
            <table>
            { tags ?
                tags?.map((p:Tag)=><tr><td>{p.id}</td><td>{p.name}</td></tr>)
            : "Loading..."}
            </table>
        </>
    );
};

const addTag = (form: any) => {
    
}

export default Processor;

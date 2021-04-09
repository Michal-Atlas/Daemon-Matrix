import {TagSideBar} from "../Components/TagSideBar";
import TagDisplay from "../Components/TagDisplay";
import React from "react";
import {useParams} from "react-router";

const View = () => {
    return(
        <>
            <TagSideBar />
            <br/><br/><br/>
            <TagDisplay />
        </>
    );
}
export default View;

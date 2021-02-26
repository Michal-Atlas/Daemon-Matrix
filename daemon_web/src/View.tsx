import {TagSideBar} from "./Components/TagSideBar";
import TagDisplay from "./Components/TagDisplay";
import React from "react";

const View = () => {
    const [disTag, SetDisTag] = React.useState(-1);
    return(
        <>
            <TagSideBar selectedTag={disTag} tagSetter={SetDisTag} />
            <br/><br/><br/>
            <TagDisplay tagId={disTag} />
        </>
    );
}
export default View;

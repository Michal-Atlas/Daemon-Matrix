import Auth from "../Components/Auth";
import React from "react";
import axios from "axios";
import './AddImage.scss';

const AddImage = () => {
    const [value, SetValue] = React.useState("");

    return(<>
            <br/><br/><br/>
            <Auth/>
            <a className={'back-button btn btn-primary'} href={"/"}>Back</a>
            <div className={'input-group'}>
                <div className={'input-group-prepend'}>
                    <span className={'input-group-text'}>URL</span>
                </div>
                <input className={'form-control'} onChange={FormChange} type="text" name='Name'/>
            </div>
        
        <input onClick={Submit} className='btn btn-primary' type='button' value='CREATE'/>
    </>);

    function Submit () {
        axios.post(`Picture/New?url=${encodeURIComponent(value)}`).catch(console.error);
        document.location.reload();
    }
    function FormChange (event: any) {
        SetValue(event.target.value);
    }
}

export default AddImage;

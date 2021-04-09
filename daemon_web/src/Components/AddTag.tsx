import React from "react";
import axios from "axios";



const AddTag = () => {
    const [value, SetValue] = React.useState("");
    return(
        <>
            <td>#</td>
            <td>
                <div className={'input-group'}>
                    <div className={'input-group-prepend'}>
                        <span className={'input-group-text'}>NEW</span>
                    </div>
                <input className={'form-control'} onChange={FormChange} type="text" name='Name'/>
                </div>
            </td>
            <td><input onClick={Submit} className='btn btn-primary' type='button' value='CREATE'/></td>
        </>
    );

    function Submit () {
        axios.post(`Tag/Edit?name=${encodeURIComponent(value)}`).catch(console.error);
        document.location.reload();
    }
    function FormChange (event: any) {
        SetValue(event.target.value);
    }
}

export default AddTag;

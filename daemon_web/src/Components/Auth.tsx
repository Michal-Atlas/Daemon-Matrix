import React from "react";
import './Auth.scss';
import axios from "axios";
import Cookies from "universal-cookie";

const Auth = () => {
    const cookies = new Cookies();
    const [pass, SetPass] = React.useState('');
    React.useEffect(()=>{
        SetPass(cookies.get('pass'));
    },[]);
    
    return(
        <input className={'auth-form form-control'} value={pass} onChange={Change} />
    );
    
    function Change(event: any){
        cookies.set('pass', event.target.value, {path: '/'});
        SetPass(event.target.value);
    }
}

export default Auth;

import React from "react";
import Layout from "../Component/Layout";
import Button from "react-bootstrap/esm/Button";
import { useState } from 'react';
import { validatePassword } from './Validation';



function ResetPassword() {
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState(false);

    async function UpdatePassword() {
        if (!password || !repassword) {
            setError(true);
            return alert("all fields are mandatory");
        }

        if(!validatePassword(password)) {
            setError(true);
            return;
        }

        if(!validatePassword(repassword)) {
            setError(true);
            return ;
        }
    }
    return (
        <Layout title={"change password"}>
            <div className="d-flex justify-content-center ">
                <div className="d-flex flex-column justify-content-center  border shadow mt-5 bg-white rounded border mt-4 p-5" style={{ width: '30%' }}>
                    <h3 className="text-primary">Reset Password</h3>

                    <div className={` my-3 ${error && !validatePassword(password) ? 'error-border' : 'input-box'}`}>
                        <label>Password</label><br />
                        <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} name='password' required />
                        {error && !validatePassword(password) && <span className="error-text text-danger"><small>Password must contain 1 number 1 uppercase & lowercase and 8 characters</small></span>}
                    </div>
                    <div className={` my-3 ${error && !validatePassword(repassword) ? 'error-border' : 'input-box'}`}>
                        <label>Re-enter Password</label><br />
                        <input type='password' value={repassword} onChange={(e) => { setRepassword(e.target.value) }} name='repassword' required />
                        {error && !validatePassword(repassword) && <span className="error-text text-danger"><small>Password must contain 1 number 1 uppercase & lowercase and 8 characters</small></span>}
                    </div>
                    <div className="d-flex justify-content-end">
                    <Button variant="primary" className="mt-4 " style={{width:'150px'}}
                    onClick={UpdatePassword}>Reset</Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ResetPassword;
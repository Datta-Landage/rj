import React from "react";
import Layout from "../Component/Layout";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";


function ChangePassword() {
    

    return (
        <Layout title={"change password"}>
            <div className="d-flex justify-content-center ">
                <div className="d-flex flex-column justify-content-center align-items-center border shadow mt-5 bg-white rounded border mt-4 p-4" style={{ width: '50%', height: '200px' }}>
                    <h3>Send Link to reset my password</h3>
                    <Link to='/resetpassword'><Button variant="primary" className="mt-4" style={{ width: '150px' }}>Share</Button></Link>
                </div>
            </div>
        </Layout>
    )
}

export default ChangePassword;
import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import './Css/CreateAccount.css';
import Accountbtn from "./AccountButtons";
import '../Css/All.css'

function Calender() {
    const [taskForm, setTaskForm] = useState(false);

    const showTaskForm = () => {
        setTaskForm(true);
    }

    return (
        <Layout title={"calender"}>
            <div className="container py-4">

                <div className="d-flex">
                    <Accountbtn />

                    <div className="container mx-4">
                    {!taskForm && (
                    <div className="container d-flex ">
                        <div className="cid-box p-3 " style={{width:'30%'}}>
                            <h2>Tasks</h2>
                            <div className="my-2 ">
                                <p>hi</p>
                                <button className="btn-secondary-cidblue w-100 p-2"
                                onClick={showTaskForm}>Create a new task</button>
                            </div>
                        </div>
                        <div className="cid-box mx-3 p-2 w-100">
                            <h2>Calender</h2>
                        </div>
                    </div>
                    )}

                    {taskForm && (
                        <div className="cid-box my-2 p-2">
                            <form>
                                <h2>Create Task</h2>
                                <div>

                                </div>
                            </form>
                        </div>
                    )}
                    </div>
                </div>
                
            </div>
        </Layout>
    );
};

export default Calender;

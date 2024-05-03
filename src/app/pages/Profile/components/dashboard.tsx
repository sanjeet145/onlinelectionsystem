"use client"

import { useState } from "react";
import BecomeCandidate from "./becomecandidate";
import Elections from "./elections";
import '../../Admin/navigation.css';

export default function ProfileDashboard(){
    const [opencandidate,setcandidate] = useState(false);
    const [openadmin,setadmin] = useState(false);
    const openCandidate=()=>{
        if(openadmin){
            openAdmin();
        }
        setcandidate(!opencandidate);
    }
    const openAdmin=()=>{
        if(opencandidate){
            openCandidate();
        }
        setadmin(!openadmin);
    }
    const inputEvent =(e:any)=>{
        console.log(e)
    }
    const user={
        name:"ram",
        isCandidate:false,
        isVoted:false,
    }

    return(
        <>
        <button className="Btn" onClick={openCandidate}>Become Candidate</button>
        <button className="Btn" onClick={openAdmin}>Change Admin</button>
        <div className={opencandidate ? "small-form" : "small-form hide"}>
            <BecomeCandidate/>
        </div>
        <div className={openadmin ? "small-form" : " small-form hide"}>
            <form>
                <div>
                    <p>New Admin ID</p>
                    <input type="text" onChange={inputEvent} name="adminId" />
                </div>
                <button className="Btn">Change</button>
            </form>
        </div>
        <Elections/>
        </>
    )
}
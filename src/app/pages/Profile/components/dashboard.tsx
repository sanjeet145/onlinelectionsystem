import { useState } from "react";
import BecomeCandidate from "./becomecandidate";
import { useRouter } from "next/navigation";

export default function ProfileDashboard() {
    const router = useRouter(); 
    const [opencandidate, setcandidate] = useState(false);
    const [openadmin, setadmin] = useState(false);
    const openCandidate = () => {
        if (openadmin) {
            openAdmin();
        }
        setcandidate(!opencandidate);
    }
    const openAdmin = () => {
        if (opencandidate) {
            openCandidate();
        }
        setadmin(!openadmin);
    }
    const user = {
        isCandidate: true
    }
    const deleteuser = async()=>{
        const con= confirm("Do you want to delete your account");
        if(con){
            const response = await fetch("/api/users/deleteuser");
            const data = await response.json();
                alert(data.message);
            if(data.success){
                router.push('/');
            }
        }
        else{
            alert("don't want")
        }
    }

    return (
        <>
            <button className="Btn" onClick={openCandidate}>Become Candidate</button>
            <button className="Btn" onClick={deleteuser}>Delete Account</button>
            {user.isCandidate ? <button className="Btn">Update Candidate</button> : ""}
            <div className={opencandidate ? "small-form" : "small-form hide"}>
                <BecomeCandidate />
            </div>
        </>
    )
}
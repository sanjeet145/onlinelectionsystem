import { useEffect, useState } from "react";
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
    let isCandidate;
    const user = async ()=>{
        const response = await fetch("/api/users/iscandidate");
        const data = await response.json();
        isCandidate=data.isCandidate;
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
            alert("Don't want to delete")
        }
    }
    const logout = async () => {
        try {
            const response = await fetch("/api/users/logout");
            const data = await response.json();
            if (data) {
                router.push('/');
            }
        } catch (error) {
            console.log("error");
        }
    }
    useEffect(() => {
        const navbutton = document.querySelector('.close-form');
        const handleClick = () => {
            setcandidate(false);
        };
        if (navbutton) {
            navbutton.addEventListener('click', handleClick);
        }

        return () => {
            if (navbutton) {
                navbutton.removeEventListener('click', handleClick);
            }
        };
    }, [opencandidate]);

    return (
        <>
            <button className="Btn" onClick={openCandidate}>Become Candidate</button>
            <button className="Btn" onClick={deleteuser}>Delete Account</button>
            {isCandidate ? <button className="Btn">Update Candidate</button> : ""}
            {opencandidate ?
                    <div className="close-form bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    : ""
                }
            <button className="Btn" onClick={logout}>Log out</button>
            <div className={opencandidate ? "small-form" : "small-form hide"}>
                <BecomeCandidate />
            </div>
        </>
    )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function BecomeCandidate(){
    const router = useRouter();
    const [form, setForm] = useState({
        electionid:"",
        description:"",
    });

    const [loading, setloading] = useState(false);

    const inputEvent = (event: any) => {
        const { name, value } = event.target;
        setForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };
    const onsubmit = async (event: any) => {
        setloading(!loading);
        event.preventDefault();
        try {
            if (!form.electionid || !form.description) {
                alert("Please fill all the fields");
            }
            else {
                console.log(form.description);
                alert("you are now candidate");
                // const response = await fetch("/api/admin", {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ form }),
                // });

                // const data = await response.json();
                // if(data){
                //     alert(data.message);
                // }
                // if(data.success){
                //     router.push('/login');
                // }
            }

        } catch (e: any) {
            alert("Something went wrong");
        }
        finally {
            setloading(false);
        }
    };
    return(
        <>
        <form onSubmit={onsubmit}>
            <div>
                <p>Election Id</p>
                <input
                type="text"
                name="electionid" 
                onChange={inputEvent}
                value={form.electionid}
                />
            </div>
            <div className="textarea">
                <p>Description</p>
                <textarea name="description" 
                onChange={inputEvent}
                value={form.description} cols={30} rows={10}></textarea>
            </div>
            <button className="Btn" type="submit">Submit</button>
        </form>
        </>
    )
}
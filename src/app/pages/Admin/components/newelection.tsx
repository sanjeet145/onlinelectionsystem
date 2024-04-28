"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewElection() {
    const router = useRouter();
    const [form, setForm] = useState({
        electionname: "",
        enddate: "",
        admin: "",
    });
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
        event.preventDefault();
        try {
            if (!form.electionname || !form.enddate || !form.admin) {
                alert("Please fill all the fields");
            }
            else {
                const response = await fetch("/api/elections", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ form }),
                });
                const data = await response.json();
                alert(data.message);
                router.push('/');
            }

        } catch (e: any) {
            alert("Something went wrong");
        }
    };
    const loginForm = () => {
        alert("already election Exist");
    };


    return (
        <form className="formc" method="POST" onSubmit={onsubmit}>
            <div className="ename">
                <p>Election Name</p>
                <input type="text"
                    name="electionname"
                    onChange={inputEvent}
                    value={form.electionname} /></div>
            <div className="enddate">
                <p>End Date</p>
                <div className="enddate">
                    <input type="date"
                        name="enddate"
                        onChange={inputEvent}
                        value={form.enddate} />
                </div>
            </div>
            <div className="Admin">
                <p>Admin</p>
                <input type="text"
                    name="admin"
                    onChange={inputEvent}
                    value={form.admin} /></div>
            <button className="Btn" type="submit">Register</button>
        </form>
    )
}
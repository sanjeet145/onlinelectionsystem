"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import '../css/forms.css';

export default function RegisterForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        fname: "",
        pass: "",
        cfmpass: "",
        passKey: "",
        mobile: "",
        adminid: "",
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
            if (!form.fname || !form.pass || !form.cfmpass || !form.mobile || !form.passKey || !form.adminid) {
                alert("Please fill all the fields");
            }
            else {
                const response = await fetch("/api/admin", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ form }),
                });

                const data = await response.json();
                if(data){
                    alert(data.message);
                }
                if(data.success){
                    router.push('/login');
                }
            }

        } catch (e: any) {
            alert("Something went wrong");
        }
        finally {
            setloading(false);
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const loginForm = () => {
        alert("already have an account");
    };


    return (
        <form className="formc" method="POST" onSubmit={onsubmit}>
            <div className="uname">
                <p>Name</p>
                <input type="text"
                    name="fname"
                    onChange={inputEvent}
                    value={form.fname} /></div>
            <div className="pass">
                <p>Password</p>
                <div className="passwordInput">
                    <input type={showPassword ? 'text' : 'password'}
                        name="pass"
                        onChange={inputEvent}
                        value={form.pass} /><br />
                    <button
                        type="button"
                        className="togglePassword"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <img src="/svgs/closeeye.svg" /> : <img src="/svgs/openeye.svg" />}
                    </button>
                </div>
            </div>
            <div className="pass">
                <p>Confirm Password</p>
                <div className="passwordInput">
                    <input type={showPassword ? 'text' : 'password'}
                        name="cfmpass"
                        onChange={inputEvent}
                        value={form.cfmpass} /><br />
                    <button
                        type="button"
                        className="togglePassword"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <img src="/svgs/closeeye.svg" /> : <img src="/svgs/openeye.svg" />}
                    </button>
                </div>
            </div>
            <div className="passkey">
                <p>Pass key</p>
                <input type="text"
                    name="passKey"
                    onChange={inputEvent}
                    value={form.passKey} /></div>
            <div className="adminid">
                <p>Admin Id</p>
                <input type="text"
                    name="adminid"
                    onChange={inputEvent}
                    value={form.adminid} /></div>
            <div className="Number">
                <p>Mobile Number</p>
                <input type="number"
                    name="mobile"
                    onChange={inputEvent}
                    value={form.mobile} /></div>
            <button className="Btn" type="submit">{loading ? "Loading" : "Register"}</button>
        </form>
    )
}
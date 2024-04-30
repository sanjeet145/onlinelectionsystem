"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import "../pages/css/forms.css";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({
        voter: "",
        pass: "",
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
    const [showPassword, setShowPassword] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [loading, setloading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    useEffect(() => {
        const link = document.querySelector('.admin');

        const handleClick = () => {
            setisAdmin(!isAdmin);
        };

        if (link) {
            link.addEventListener('click', handleClick);
        }

        return () => {
            if (link) {
                link.removeEventListener('click', handleClick);
            }
        };
    }, [isAdmin]);

    const onsubmit = async (e: any) => {
        e.preventDefault();
        setloading(!loading);
        try {
            let response;
            if (isAdmin) {
                response = await fetch("/api/users/admin", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ form }),
                });
            }
            else {
                response = await fetch("/api/users/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ form }),
                });
            }
            const data = await response.json();
            alert(data.message);
            console.log(data);
            router.push('pages/Admin');

        } catch (e) {
            console.log(e);
            alert("not submitted");
        }
        finally {
            setloading(false);
        }
    };
    return (
        <>
            <div className="form-card">
                <div className="card1">
                    <form className="formc" onSubmit={onsubmit}>
                        <a className={isAdmin ? "admin admin-clicked" : "admin"}>Admin</a>
                        <div className="uname">
                            <p>Voter Id</p>
                            <input type="text"
                                name="voter"
                                onChange={inputEvent}
                                value={form.voter} /></div>
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
                                    {showPassword ? <img src="svgs/closeeye.svg" /> : <img src="svgs/openeye.svg" />}
                                </button>
                            </div>
                        </div>
                        <button className="Btn" type="submit">{loading ? "loading" : "Login"}</button>
                    </form>
                    <p>Already have account <Link href={"/register"} className="link">Register</Link></p>
                </div>
            </div>
        </>
    );
}

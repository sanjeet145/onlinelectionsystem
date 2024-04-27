"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import "../pages/css/forms.css";
import {useRouter} from "next/navigation";

let isAdmin=false;
const adminClick = () => {
    if(isAdmin){
        isAdmin=false;
    }
    else
     isAdmin=true;
  };

export default function Login() {
    const router =useRouter();
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

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    

    useEffect(() => {
        const link = document.querySelector('.admin');
    
        const handleClick = () => {
          adminClick();
        };
    
        if (link) {
          link.addEventListener('click', handleClick);
        }
    
        return () => {
          if (link) {
            link.removeEventListener('click', handleClick);
          }
        };
      }, []); 
    
    const onsubmit = async(e:any) => {
        e.preventDefault();
        try{
            let response;
            if(isAdmin){
                console.log("inside adminfetch");
                response = await fetch("/api/users/admin", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({form}),
                });
            }
            else{
                response = await fetch("/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ form}),
            });
            }
            const data = await response.json();
                    if(data.success){
                        router.push('pages/Admin');
                    }
                   else{
                    alert(data.message);
                   }
        }catch{
            alert("not submitted");
        }
    };
    return (
        <>
            <div className="form-card">
                <div className="card1">
                    <form className="formc" onSubmit={onsubmit}>
                    <a className="admin">Admin</a>
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
                                value={form.pass} /><br/>
                            <button
                                type="button"
                                className="togglePassword"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ?  <img src="svgs/closeeye.svg"/> : <img src="svgs/openeye.svg"/>}
                            </button>
                        </div>
                            </div>
                        <button className="Btn" type="submit">Login</button>
                    </form>
                    <p>Already have account <Link href={"/register"} className="link">Register</Link></p>
                </div>
            </div>
        </>
    );
}

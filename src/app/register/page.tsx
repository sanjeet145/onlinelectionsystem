"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../pages/css/forms.css";
import RegisterForm from "./registercard";


export default function Register() {

    return (
        <>
            <div className="form-card">
                <div className="card1">
                    <RegisterForm/>
                    <p>Already have account <Link href={"/login"} className="link">login</Link></p>
                </div>
            </div>
        </>
    );
}

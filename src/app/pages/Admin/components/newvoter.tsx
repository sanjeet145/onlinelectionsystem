import Register from "@/app/register/page";
import RegisterForm from "@/app/register/registercard";
import { useState } from "react";
import '../../css/forms.css';

export default function AddNewVoter() {
    const [val , setVal] = useState("");
    const inputEvent=(e:any)=>{
        console.log(e.target.value);
    }

    return (
        <div className="add-form">
        <RegisterForm/>
        </div>
    )
}
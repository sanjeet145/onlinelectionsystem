"use client"

import Login from "./login/page";
import Register from "./register/page";

export default function Home() {
  const voter=()=>{
    alert("voter");
 }; 
 var count=0;
  return (
    <>
    {/* <div className="banner"></div>
    <button onClick={voter}>Voter</button>
    <button>Candidate</button>
    <button>Admin</button> */}
    {count == 0?
    (<Login/>):(
      <Register/>
    )}
    </>
  );
}

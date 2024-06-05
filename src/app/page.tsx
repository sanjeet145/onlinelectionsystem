"use client"

import Image from "next/image";

// import Login from "./login/page";
// import Register from "./register/page";

export default function Home() {
  //   const voter=()=>{
  //     alert("voter");
  //  }; 
  //  var count=0;
  return (
    <div className="homepage">
      {/* <div className="banner"></div>
    <button onClick={voter}>Voter</button>
    <button>Candidate</button>
    <button>Admin</button> */}
      {/* {count == 0?
    (<Login/>):(
      <Register/>
    )} */}
      <div className="homenavbar">
        <a href="/login" className="Btn">Login</a>
        <a href="/register" className="Btn">Register</a>
      </div>
      <div className="bannerimage"> </div>
    </div>
  );
}

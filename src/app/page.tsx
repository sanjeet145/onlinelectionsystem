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
    <>
    {/* <div className="banner"></div>
    <button onClick={voter}>Voter</button>
    <button>Candidate</button>
    <button>Admin</button> */}
    {/* {count == 0?
    (<Login/>):(
      <Register/>
    )} */}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    <div className="bannerimage">
      <Image
        src="/images/topbanner.jpg"
        alt="Top Banner"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="image"
      />
    </div>
    </>
  );
}

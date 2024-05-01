// "use client"

import ProfileDashboard from "./dashboard";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import '../../Admin/navigation.css'
// import BecomeCandidate from "./becomecandidate";
// import ProfileDashboard from "./dashboard";

// export default function ProfileNavbar() {
//     const router = useRouter();

//     const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");
//     const [navOpen, setNavOpen] = useState(false);

//     const handleNavItemClick = (navItem: any) => {
//         setSelectedNavItem(navItem);
//         setNavOpen(false);
//     };

//     useEffect(() => {
//         const navbutton = document.querySelector('.small-btn');

//         const handleClick = () => {
//             setNavOpen(!navOpen);
//         };

//         if (navbutton) {
//             navbutton.addEventListener('click', handleClick);
//         }

//         return () => {
//             if (navbutton) {
//                 navbutton.removeEventListener('click', handleClick);
//             }
//         };
//     }, [navOpen]);

//     const logout = async () => {
//         try {
//             const response = await fetch("/api/users/logout");
//             const data = await response.json();
//             if(data){
//                 router.push('/');
//             }
//         } catch (error) {
//             console.log("error");
//         }
//     }

//     return (
//         <div className=" profile">
//             <div className="nav-bar">
//                 <div className="small-btn"><button>small</button></div>
//                 <div className={navOpen ? "navigation-bar" : "navigation-bar hide"}>
//                     <button className={selectedNavItem === "Dashboard" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("Dashboard")}>
//                         Dashboard
//                     </button>
//                     <button className={selectedNavItem === "BecomeCandidate" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("BecomeCandidate")}>
//                        Become Candidates
//                     </button>
//                     <button className={selectedNavItem === "Voters" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("Voters")}>
//                         Admin
//                     </button>
//                     <button className={selectedNavItem === "Logout" ? "nav-btn selected-btn" : "nav-btn"} onClick={logout}>
//                         Log out
//                     </button>
//                 </div>
//             </div>
//             <div className="contents-section">
            
//             {selectedNavItem === "Dashboard" && <ProfileDashboard/>}
//             {selectedNavItem === "BecomeCandidate" && <BecomeCandidate/>}
//             {/* {selectedNavItem === "Logout" && <LogoutContent />} */}
//             </div>
//         </div>
//     );
// }

export default function ProfileNavbar(){
    return(
        <ProfileDashboard/>
    )
}

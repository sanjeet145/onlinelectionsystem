"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import "./navigation.css";
import AdminDashboard from "./components/admindashboard";
import AdminCandidate from "./components/candidates";
import Voters from "./components/voters";
import PendingVoters from "./components/pendingVoters";
import AddNewVoter from "./components/newvoter";
import NewElection from "./components/newelection";
import PreviousElections from "./components/previouselections";

export default function ProfileNav() {
    const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");
    const [navOpen, setNavOpen] = useState(false);

    const handleNavItemClick = (navItem:any) => {
        setSelectedNavItem(navItem);
         setNavOpen(false);
    };
    
    useEffect(() => {
        const navbutton = document.querySelector('.small-btn');
    
        const handleClick = () => {
             setNavOpen(!navOpen);
        };
    
        if (navbutton) {
          navbutton.addEventListener('click', handleClick);
        }
    
        return () => {
          if (navbutton) {
            navbutton.removeEventListener('click', handleClick);
          }
        };
    }, [navOpen]); 

    return (
        <div className=" profile">
            <div className="nav-bar">
            <div className="small-btn"><button>small</button></div>
            <div className={navOpen ? "navigation-bar" : "navigation-bar hide"}>
                <button className={selectedNavItem === "Dashboard" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("Dashboard")}>
                    Dashboard
                </button>
                <button className={selectedNavItem === "Candidates" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("Candidates")}>
                    Candidates
                </button>
                <button className={selectedNavItem === "Voters" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("Voters")}>
                    Voters
                </button>
                <button className={selectedNavItem === "PendingVoters" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("PendingVoters")}>
                    Pending Voters
                </button>
                <button className={selectedNavItem === "NewVoters" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("NewVoters")}>
                    Add Voters
                </button>
                <button className={selectedNavItem === "NewElection" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("NewElection")}>
                    New Election
                </button>
                <button className={selectedNavItem === "PreviousElections" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("PreviousElections")}>
                    Previous Elections
                </button>
                <button className={selectedNavItem === "Logout" ? "nav-btn selected-btn" : "nav-btn"} onClick={() => handleNavItemClick("Logout")}>
                    Log out
                </button>
            </div>
            </div>

            {selectedNavItem === "Dashboard" && <AdminDashboard />}
            {selectedNavItem === "Candidates" && <AdminCandidate />}
            {selectedNavItem === "Voters" && <Voters />}
            {selectedNavItem === "PendingVoters" && <PendingVoters />}
            {selectedNavItem === "NewVoters" && <AddNewVoter />}
            {selectedNavItem === "NewElection" && <NewElection />}
            {selectedNavItem === "PreviousElections" && <PreviousElections />}
            {/* {selectedNavItem === "Logout" && <LogoutContent />} */}
        </div>
    );
}

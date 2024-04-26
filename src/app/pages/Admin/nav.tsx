"use client"

import Link from "next/link";
import { useState } from "react";
import "./navigation.css";
import AdminDashboard from "./admindashboard";
import AdminCandidate from "./candidates";
import Voters from "./voters";

export default function ProfileNav() {
    const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");

    const handleNavItemClick = (navItem:any) => {
        setSelectedNavItem(navItem);
    };

    return (
        <div className=" flex">
            <div className="nav-bar navigation-bar">
            <button className="nav-btn" onClick={() => handleNavItemClick("Dashboard")}>
                Dashboard
            </button>
            <button className="nav-btn" onClick={() => handleNavItemClick("Candidates")}>
                Candidates
            </button>
            <button className="nav-btn" onClick={() => handleNavItemClick("Voters")}>
                Voters
            </button>
            <button className="nav-btn" onClick={() => handleNavItemClick("PendingVoters")}>
                Pending Voters
            </button>
            <button className="nav-btn" onClick={() => handleNavItemClick("New Voters")}>
                Add Voters
            </button>
            <button className="nav-btn" onClick={() => handleNavItemClick("PreviousElections")}>
                Previous Elections
            </button>
            <button className="nav-btn" onClick={() => handleNavItemClick("Logout")}>
                Log out
            </button>
            </div>

            {selectedNavItem === "Dashboard" && <AdminDashboard/>}
            {selectedNavItem === "Candidates" && <AdminCandidate/>}
            {selectedNavItem === "Voters" && <Voters />}
            {/* {selectedNavItem === "PreviousElections" && <PreviousElectionsContent />} */}
            {/* {selectedNavItem === "Logout" && <LogoutContent />} */}
        </div>
    );
}

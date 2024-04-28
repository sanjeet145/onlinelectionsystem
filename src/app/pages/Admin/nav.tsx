"use client"

import Link from "next/link";
import { useState } from "react";
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

    const handleNavItemClick = (navItem:any) => {
        setSelectedNavItem(navItem);
    };

    return (
        <div className=" profile">
            <div className="nav-bar navigation-bar">
            <button className={selectedNavItem === "Dashboard" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("Dashboard")}>
                Dashboard
            </button>
            <button className={selectedNavItem === "Candidates" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("Candidates")}>
                Candidates
            </button>
            <button className={selectedNavItem === "Voters" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("Voters")}>
                Voters
            </button>
            <button className={selectedNavItem === "PendingVoters" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("PendingVoters")}>
                Pending Voters
            </button>
            <button className={selectedNavItem === "NewVoters" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("NewVoters")}>
                Add Voters
            </button>
            <button className={selectedNavItem === "NewElection" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("NewElection")}>
                New Election
            </button>
            <button className={selectedNavItem === "PreviousElections" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("PreviousElections")}>
                Previous Elections
            </button>
            <button className={selectedNavItem === "Logout" ?"nav-btn selected-btn":"nav-btn" } onClick={() => handleNavItemClick("Logout")}>
                Log out
            </button>
            </div>

            {selectedNavItem === "Dashboard" && <AdminDashboard/>}
            {selectedNavItem === "Candidates" && <AdminCandidate/>}
            {selectedNavItem === "Voters" && <Voters />}
            {selectedNavItem === "PendingVoters" && <PendingVoters />}
            {selectedNavItem === "NewVoters" && <AddNewVoter />}
            {selectedNavItem === "NewElection" && <NewElection />}
            {selectedNavItem === "PreviousElections" && <PreviousElections />}
            {/* {selectedNavItem === "Logout" && <LogoutContent />} */}
        </div>
    );
}

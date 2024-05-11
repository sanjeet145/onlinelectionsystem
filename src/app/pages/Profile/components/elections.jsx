"use client"

import { useEffect, useState } from "react";
import BecomeCandidate from "./becomecandidate";

export default function Elections() {

    const [elections, setelections] = useState([]);
    const [openform, setOpenForm] = useState(false);
    const [candidates, setcandidates] = useState([]);
    const [electionAdminid, setelectionAdminId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedElection, setSelectedElection] = useState(null);

    useEffect(() => {
        if (selectedElection) {
            const fetchCandidate = async (electionID, adminID) => {
                try {
                    setLoading(true);
                    const requestData = {
                        electionid: electionID,
                        adminid: adminID,
                    };
                    const queryParams = new URLSearchParams(requestData);
                    const response = await fetch(`/api/users/candidate?${queryParams}`);
                    const data = await response.json();
                    setcandidates(data.users);
                    setelectionAdminId(requestData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching candidates');
                    setLoading(false);
                }
            };

            fetchCandidate(selectedElection.electionID, selectedElection.adminID);
        }
    }, [selectedElection]);

    const openCandidate = (electionID, adminID) => {
        setOpenForm(!openform);
        setSelectedElection({ electionID, adminID });
    }
    const vote = (electionID, adminID, voterid) => {
        console.log("electionid ", electionID, " adminid-", adminID, " voterid-", voterid);
    }

    useEffect(() => {
        const navbutton = document.querySelector('.close-form');
        const handleClick = () => {
            // navbutton?.classList.toggle("close");
            setOpenForm(!openform);
            
        };
        if (navbutton) {
            navbutton.addEventListener('click', handleClick);
        }

        return () => {
            if (navbutton) {
                navbutton.removeEventListener('click', handleClick);
            }
        };
    }, [openform]);
    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await fetch('/api/elections');
                const data = await response.json();
                setelections(data.elections || []);
            } catch (error) {
                console.error('Error fetching elections');
            }
        };

        fetchData();
    }, []);
    return (
        <div className="main-content">
            <div className="pending">
                <h1 className="lists-head">Elections</h1>
                <div className="flex-container">
                    {elections.length > 0 ? (
                        elections.map(election => (
                            <div className="prev-card" key={election.id}>
                                <h1>Election Name: <a>{election.electionname}</a></h1>
                                <h1>Election Date: <a>{new Date(election.enddate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}</a></h1>
                                <h1><a>{election.admin}</a> Won</h1>
                                <button className="Btn" onClick={() => openCandidate(election.electionId, election.adminId)}>Candidates</button>
                                {openform ?
                                    < div className="small-form">
                                        {!loading ? (
                                            candidates && candidates.length > 0 ? (
                                                <>
                                                    <div className="close-form bars">
                                                        <div className="bar"></div>
                                                        <div className="bar"></div>
                                                    </div>
                                                    <table className="candidate-vote-card">
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Voter Id</th>
                                                            <th>Vote</th>
                                                        </tr>
                                                        {candidates.map(candidate => {
                                                            return (
                                                                <tr className="candidate-vote">
                                                                    <td>{candidate.fname}</td>
                                                                    <td key={candidate.id}>{candidate.voterid}</td>
                                                                    <td><button className="vote-btn" onClick={() => vote(electionAdminid.electionid, electionAdminid.adminid, candidate.voterid)}>Vote</button></td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </table>
                                                </>
                                            ) : (
                                                <>
                                                    <h1>No candidates found</h1>
                                                </>
                                            )
                                        ) : (
                                            <h1>Loading...</h1>
                                        )}
                                    </div>
                                    : ""
                                }
                            </div>
                        ))
                    ) : (
                        <h2>Loading...</h2>
                    )}
                </div>
            </div>
        </div>
    )
}

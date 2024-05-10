"use client"

import { useEffect, useState } from "react";
import BecomeCandidate from "./becomecandidate";

export default function Elections() {

    const [elections, setelections] = useState([]);
    const [candidates, setcandidates] = useState([]);
    const [loading, setLoading] = useState(false);

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
            setcandidates(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching candidates');
            setLoading(false);
        }
    };

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

    const openCandidate = (electionID, adminID) => {
        fetchCandidate(electionID, adminID);
    }

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
                                <button className="Btn" onClick={() => openCandidate(election.electionId, election.adminId)}>Vote</button>
                                <div className="small-form">

                                    {loading && <h1>Loading....</h1>}
                                    {!loading && candidates && candidates.length > 0 ? (
                                        candidates.map(candidate => (
                                            <h1 key={candidate.id}>{candidate.voterid}</h1>
                                        ))
                                    ) : (
                                        <h1>{loading ? "Loading..." : "No candidates found"}</h1>
                                    )}

                                </div>
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






// import { useEffect, useState } from "react";
// import BecomeCandidate from "./becomecandidate";

// export default function Elections() {

//     const [elections, setelections] = useState();
//     const [candidates, setcandidates] = useState();
//     let fetchCandidate;
//     useEffect(() => {
//         fetchCandidate = async (electionID, adminID) => {
//             try {
//                 const requestData = {
//                     electionid: electionID,
//                     adminid: adminID,
//                 };
//                 const queryParams = new URLSearchParams(requestData);
//                 const response = await fetch(`/api/users/candidate?${queryParams}`);
//                 const data = await response.json();
//                 setcandidates(data);
//             } catch (error) {
//                 console.error('Error fetching elections');

//             }
//         }
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/api/elections');
//                 const data = await response.json();
//                 setelections(data.elections);
//             } catch (error) {
//                 console.error('Error fetching elections');
//             }
//         };

//         fetchData();
//     }, []);

//     const [opencandidate, setcandidate] = useState(false);
//     const openCandidate = (electionID, adminID) => {
//         setcandidate(!opencandidate);
//         fetchCandidate(electionID, adminID);
//     }
//     return (
//         <div className="main-content">
//             <div className="pending">
//                 <h1 className="lists-head">Elections</h1>
//                 <div className="flex-container">
//                     {elections ?
//                         <>
//                             {
//                                 elections.map(election => (
//                                     <div className="prev-card" key={election.id}>
//                                         <h1>Election Name: <a>{election.electionname}</a></h1>
//                                         <h1>Election Date: <a>{new Date(election.enddate).toLocaleDateString('en-GB', {
//                                             day: '2-digit',
//                                             month: 'short',
//                                             year: 'numeric'
//                                         })}</a></h1>
//                                         <h1><a>{election.admin}</a> Won</h1>
//                                         {/* <button className="Btn" onClick={openCandidate(election.electionId,election.adminId)}>Vote</button> */}
//                                         <button className="Btn" onClick={() => openCandidate(election.electionId, election.adminId)}>Vote</button>

//                                         <div className={opencandidate ? "small-form" : "small-form hide"}>
//                                             {
//                                                 candidates ? <>
//                                                     {candidates.map(candidate => (
//                                                         <h1>{candidate.voterid}</h1>
//                                                     ))}
//                                                 </> : <>
//                                                     <h1>Loading....</h1>
//                                                 </>
//                                             }
//                                             <h1>loading</h1>
//                                         </div>

//                                     </div>
//                                 ))
//                             }
//                         </>
//                         : <>
//                             <h2>loading...</h2>
//                         </>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }
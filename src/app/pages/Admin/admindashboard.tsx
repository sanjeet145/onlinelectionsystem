import { useEffect, useState } from "react";
interface Candidate {
    isVoted: Boolean;
    id: String,
    fname: String,
    voterid: String,
    pass: String,
    mobile: Number,
    isAdmin: Boolean,
    isCandidate: Boolean,
    isVerified: Boolean,
    token: String,
}

export default function AdminDashboard() {

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users/voters');
                const data = await response.json();
                setCandidates(data.users);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchData();
    }, []);
    console.log(candidates);
    let candis=0;
    let voted=0
    for(const candidate of candidates){
        console.log(candidate);
        if(candidate.isCandidate){
            candis++;
        }
        if(candidate.isVoted){
            voted++;
        }
    }
    return (
        <>
            <div className="flex-container">
                <div className=" candidate-card">
                    <h1>{candis}</h1>
                    <h1>Number of Candidates</h1>

                </div>
                <div className=" candidate-card">
                    <h1>{candidates.length}</h1>
                    <h1>Number of Voters</h1>
                </div>
                <div className=" candidate-card">
                    <h1>{voted}</h1>
                    <h1>Total Voted</h1>
                </div>
                <div className=" candidate-card">
                    <h1>{candidates.length-voted}</h1>
                    <h1>Remaining Votes</h1>
                </div>
                <div className=" candidate-card">
                    <h1>{candidates.length}</h1>
                    <h1>Candidate Wining</h1>
                </div>
            </div>
        </>
    )
}


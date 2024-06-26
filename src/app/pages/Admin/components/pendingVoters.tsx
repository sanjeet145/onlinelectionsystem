import PendingVotersCard from "@/components/pendingvoters";
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

export default function PendingVoters() {


    const [voters, setvoters] = useState<Candidate[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/verifyvoters');
                const data = await response.json();
                setvoters(data.users);
            } catch (error) {
                console.error('Error fetching voters:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="main-content">
            <div className="pending">
                {voters ? <>
                    {voters.filter(voter => !voter.isVerified).map(voter => (
                        <PendingVotersCard key={voter.id} {...voter} />
                    ))}
                </> : <></>}
            </div>
        </div>
    )
}
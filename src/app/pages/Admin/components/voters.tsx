import VotersCard from "@/components/voters";
import { useEffect, useState } from "react"

interface Voter {
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

export default function Voters() {
    const [voters, setVoter] = useState<Voter[]>([]); // Explicitly define candidates as an array of Candidate objects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/voters');
                const data = await response.json();
                setVoter(data.users); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-content">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Voter ID</th>
                    <th>Mobile</th>
                </tr>
                {voters.map(voter => (
                  
                     <VotersCard key={voter.id} {...voter} />
                ))}
            </table>
        </div>
    )
}
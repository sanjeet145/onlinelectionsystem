import React, { useState, useEffect } from 'react';
import CandidateCard from '@/components/candidatecard';

interface Candidate {
    id: String,
    fname: String,
    voterid: String,
    pass:String,
    mobile: Number,
    isAdmin: Boolean,
    isCandidate:Boolean,
    isVerified: Boolean,
    token: String,
}

export default function AdminCandidate() {
    const [candidates, setCandidates] = useState<Candidate[]>([]); // Explicitly define candidates as an array of Candidate objects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users/voters');
                const data = await response.json();
                setCandidates(data.users); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchData(); 
    }, []);

    return (
        <div className=' m-2'>
            
            <h2 className=' text-4xl underline mb-2'>Candidate List</h2>
            {candidates.length > 0 ? 
                <div className='flex-container'>
                    {candidates.map(candidate => (
                       <>
                        <CandidateCard  {...candidate} />
                        </>

                    ))}
                 </div>
            : 
                <p>Loading candidates...</p>
            }
        </div>
    );
}

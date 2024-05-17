import React, { useState, useEffect } from 'react';
import CandidateCard from '@/components/candidatecard';

interface Candidate {
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

export default function AdminCandidate() {
    const [candidates, setCandidates] = useState<Candidate[]>([]); // Explicitly define candidates as an array of Candidate objects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/candidate');
                const data = await response.json();
                setCandidates(data.candidates); 
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="main-content">

            <h2 className='lists-head'>Candidate List</h2>
            {candidates && candidates.length > 0 ?
                <div className='flex-container'>
                    {candidates.map(candidate => (
                        <CandidateCard key={candidate.id} {...candidate} />
                    ))}
                </div>
                :
                <p>Loading candidates...</p>
            }

        </div>
    );
}

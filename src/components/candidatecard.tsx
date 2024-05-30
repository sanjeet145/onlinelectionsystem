import Image from "next/image";

export default function CandidateCard(candidate: any) {
    const vote = async (electionID:any, voterid:any) => {
        try {
            const form = {
                "electionid": electionID,
                "voterid": voterid
            }
            const response = await fetch("/api/vote", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ form }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Something went wrong");
        }
    }
    const verifyCandidate = async (candidateid: any, electionId: any) => {
        try {
            const form = {
                "voterid": candidateid,
                "electionId": electionId,
            }
            const response = await fetch("/api/verifycandidate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ form }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Something went wrong");
        }
    }
    return (
        <div className="candidate-card">
            {candidate ?
                (
                    <>
                        <Image loader={({ src }) => src} src={candidate.imgurl} alt={candidate.voterid} width={300} height={300} />
                        <div className="candidate-details">
                            <p><a>Candidate Name:</a> {candidate.voterid}</p>
                            <p><a>Party Name:</a> {candidate.partyname}</p>
                            <p><a>Description: </a>{candidate.description}</p>
                        </div>
                        {candidate.isCandidate ?
                            <button className="Btn" onClick={()=>{vote(candidate.electionId,candidate.voterid)}}>Vote</button> : <button className="Btn" onClick={() => { verifyCandidate(candidate.voterid, candidate.electionId) }}>Approve</button>
                        }
                    </>
                ) :
                <p>Candidate not found</p>
            }
        </div>
    );

}
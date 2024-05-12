import Image from "next/image";

export default function CandidateCard(candidate: any) {

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
                        {candidate.isApproved ?
                            <button className="Btn">Vote</button> : <button className="Btn">Approve</button>
                        }
                    </>
                ) :
                <p>Candidate not found</p>
            }
        </div>
    );

}
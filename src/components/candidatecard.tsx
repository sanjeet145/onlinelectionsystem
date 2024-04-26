import Image from "next/image";

export default function CandidateCard(candidate: any) {

    return (
        <div className="candidate-card">
            {candidate ?
                (
                    <>
                        <Image src={candidate.img} alt={candidate.fname} />
                        <div className="candidate-details">
                            <p><a>Candidate Name:</a> {candidate.fname}</p>
                            <p><a>Election Name:</a> BJP</p>
                            <p><a>Description: </a>{candidate.voterid}</p>
                        </div>
                        {candidate.isApproved ?
                            <button className="Btn">Vote</button> : candidate.isAdmin ?
                                <button className="Btn">Approve</button> : <p className="not-approved">Not Approved by the Admin</p>
                        }
                    </>
                ) :
                <p>Candidate not found</p>
            }
        </div>
    );

}
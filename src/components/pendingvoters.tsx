
import "./style.css";

export default function PendingVotersCard(voter:any){
    return(
        <div className="pending-voters">
            <a>{voter.fname}</a>
            <a>{voter.mobile}</a>
            <a>{voter.voterid}</a>
            <button>Approve</button>
        </div>
    )
}
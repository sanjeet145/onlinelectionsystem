
import "./style.css";

export default function PendingVotersCard(voter:any){
    const approve=async (voterid: any)=>{
        try {
            const form = {
                "voterid": voterid
            }
            const response = await fetch("/api/verifyvoters", {
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
    return(
        <div className="pending-voters">
            <a>{voter.fname}</a>
            <a>{voter.mobile}</a>
            <a>{voter.voterid}</a>
            <button key={voter.voterid} onClick={()=>approve(voter.voterid)}>Approve</button>
        </div>
    )
}
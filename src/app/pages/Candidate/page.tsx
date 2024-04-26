
import CandidateCard from "@/components/candidatecard";
import "./candidate.css";

export default function Candidate(){
    const candidate={
        cand1:{
            img:"/images/anime.png",
            name:"Ram",
            electionName:"college election",
            description:"manufest what we going to do",
            isApproved:false,  
            isAdmin:true,         
        }
    }
    return(
        <>
        <CandidateCard {...candidate.cand1}/>
        </>
    )
}
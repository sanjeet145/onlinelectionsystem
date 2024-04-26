import Image from "next/image";
import "./style.css";

export default function VoteCard(candidate:any){
    return(
        <div className="vote-card">
            <Image src="/images/anime.png" width={20} height={20} alt={candidate.name}/>
            <a className=" items-center ">{candidate.name}</a>
            <button>Vote</button>
        </div>
    )
}
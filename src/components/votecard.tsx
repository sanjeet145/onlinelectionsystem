import Image from "next/image";

export default function VoteCard(candidate:any){
    return(
        <div className=" h-20 flex justify-between items-center w-full p-3">
            <Image src="/images/anime.png" className=" h-20 w-20" alt={candidate.name}/>
            <a className=" items-center ">{candidate.name}</a>
            <button>Vote</button>
        </div>
    )
}
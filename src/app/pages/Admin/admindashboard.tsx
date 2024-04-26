import VoteCard from "@/components/votecard";

export default function AdminDashboard(){
    const candidate={
        candidate1:{
            name:"Ram",
            voterId:"KM1234"
        },
        candidate2:{
            name:"Shyam",
            voterId:"KM1234"
        }
    }
    return(
        <VoteCard {...candidate.candidate1}/>
    )
}
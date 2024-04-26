export default function VotersCard(voter:any){
    return(
        <>
        <tr className="voter-row">
            <td className="voter-name">
            {voter.fname}
        </td>
        <td>
            {voter.voterid}
        </td>
        <td>
            {voter.mobile}
        </td>
        </tr>
        {/* <div>
        <a className=" items-center ">{voter.fname}</a>
            <a className=" items-center ">{voter.voterid}</a>
            <a className=" items-center ">{voter.mobile}</a>
        </div> */}
        </>
    )
}
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
        </>
    )
}
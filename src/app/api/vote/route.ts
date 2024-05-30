import { dbConnect } from "@/db/dbConn";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import User from "@/models/user";
import Candidate from "@/models/candidate";
import Admin from "@/models/admin";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const decode = await getDataFromCookie(request);
        if(decode.isAdmin){
            const { electionid, voterid } = reqBody.form;
            const candidateid = voterid;
            await dbConnect();
            const user = await Admin.findOne({ _id: decode.id });
            let hasVoted = false;
            user.Voted.forEach((election: any) => {
                if (election.electionid === electionid) {
                    hasVoted = true;
                }
            });
            if (hasVoted) {
                return NextResponse.json({
                    message: "Already voted"
                });
            }
            user.Voted.push({ electionid, votedCandidateid: candidateid, isVoted: true });
            await user.save();
            await Candidate.findOneAndUpdate(
                { voterid: candidateid },
                { $inc: { totalVotes: 1 } },
                { new: true }
            );
            // console.log(user);
            return NextResponse.json({
                message: "voted successfully"
            })
        }
        const { electionid, adminid, voterid } = reqBody.form;
        const candidateid = voterid;
        await dbConnect();
        const user = await User.findOne({ _id: decode.id });
        let hasVoted = false;
        user.Voted.forEach((election: any) => {
            if (election.electionid === electionid) {
                hasVoted = true;
            }
        });
        if (hasVoted) {
            return NextResponse.json({
                message: "Already voted"
            });
        }
        user.Voted.push({ electionid, votedCandidateid: candidateid, isVoted: true });
        await user.save();
        await Candidate.findOneAndUpdate(
            { voterid: candidateid },
            { $inc: { totalVotes: 1 } },
            { new: true }
        );
        // console.log(user);
        return NextResponse.json({
            message: "voted successfully"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong"
        })
    }
}
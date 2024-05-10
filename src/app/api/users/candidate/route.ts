import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Candidate from "@/models/candidate";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const reqBody = await request.json();
        const { electionid, description } = reqBody.form;
        // console.log(electionid);
        const decode = await getDataFromCookie(request);
        const user = await User.findOne({ _id: decode.id });
        const candidate = await Candidate.findOne({ electionId: electionid, voterid: user.voterid, adminId: user.adminId });
        if (candidate) {
            if (candidate.isRequested) {
                console.log("already a candidate requested of this election");
                return NextResponse.json({
                    message: "ALready requested",
                    success: "false",
                })
            }
            console.log("already a candidate of this election");
            return NextResponse.json({
                message: "Already candidate",
                success: "false",
            })
        }
        else {
            const voterid = user.voterid;
            const admin = user.adminId;
            const candidat = new Candidate({ voterid, electionId: electionid, adminId: admin, description });
            await candidat.save();
            return NextResponse.json({
                message: "Candidate request sent",
                success: "true",
            });
        }

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            success: "false",
        })
    }
}

export async function GET(req: NextRequest) {

    // get the adminid and electionid
    const url = req.url || '';
    const queryString = url.split('?', 2);
    const cleanedQueryString = queryString[1].substring(0);
    const keyValuePairs = cleanedQueryString.split('&');
    let adminId, electionId;
    keyValuePairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key === 'adminid') {
            adminId = value;
        } else if (key === 'electionid') {
            electionId = value;
        }
    });
    await dbConnect();
    const candidates = await Candidate.find({ electionId: electionId, adminId: adminId });
    if (candidates) {
        const userPromises = candidates.map(async (candidate: { voterid: any; }) =>(
            await User.findOne({voterid: candidate.voterid})
            
        ))
        // const user = candidates.map(async (candidate: { voterid: any; }) => await User.findOne({ voterid: "user" }))
        const cand = await Promise.all(userPromises);
        const users = cand.map((voter: {
            isAdmin: Boolean;
            isVerified:Boolean;
            isCandidate: Boolean;
            isVoted: Boolean; mobile: any; voterid: any; fname: any; 
    }) => (
            {
                fname: voter.fname,
                voterid: voter.voterid,
                mobile: voter.mobile,
                isVoted: voter.isVoted,
                isCandidate: voter.isCandidate,
                isAdmin:voter.isAdmin,
                isVerified:voter.isVerified,
            }
        ))
        return NextResponse.json({
            users
        })
    }
    else {
        return NextResponse.json({
            message: "No candidates found"
        })
    }
}
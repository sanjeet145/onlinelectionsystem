import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Candidate from "@/models/candidate";
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const reqBody = await request.json();
        const { electionid, description } = reqBody.form;
        console.log(electionid);
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
            const voter = user.voterid;
            const admin = user.adminId;
            const candidat = new Candidate({ voter, electionid, admin, description });
            await candidat.save();
            return NextResponse.json({
                message: "Candidate request sent",
                success: "true",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong",
            success: "false",
        })
    }
}

export async function GET(req: NextApiRequest) {
    const url = req.url || '';
    const host  = req.headers.host || 'localhost';
    const fulurl = new URL(url, `htt://${host}`); // Construct full URL
    const searchParams = fulurl.searchParams;
    const electionid = searchParams.get('electionid') as string; // This will contain all query parameters
    const adminid = searchParams.get('adminid') as string; // This will contain all query parameters
    await dbConnect();
    // get the adminid and electionid
    // const electionid="ele";
    // const adminid="admin";
    const candidates = await Candidate.find({ electionId: electionid, adminId: adminid });
    if (candidates) {
        return NextResponse.json({
            candidates
        })
    }
    else{
        return NextResponse.json({
            message: "No candidates found"
        })
    }
}
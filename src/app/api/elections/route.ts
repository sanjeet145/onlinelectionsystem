import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import Admin from "@/models/admin";
import Election from "@/models/election";
import Candidate from "@/models/candidate";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const reqBody = await req.json();
        const { electionname, enddate, electionid } = reqBody.form;
        const decode = await getDataFromCookie(req);
        const admin = await Admin.findOne({ _id: decode.id });
        const ele = await Election.findOne({ adminId: admin.adminId, electionId: electionid });
        if (ele) {
            return NextResponse.json({
                message: "Change Election Id"
            })
        }
        const election = new Election({ electionname, enddate, adminId: admin.adminId, electionId: electionid });
        await election.save();
        return NextResponse.json({
            message: "Details registered"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Unable to register"
        })
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const decode = await getDataFromCookie(req);
        let user;
        let adminid;
        if (!decode.isAdmin) {
            user = await User.findOne({ _id: decode.id });
            adminid = user.adminId;
        }
        else {
            user = await Admin.findOne({ _id: decode.id });
            adminid = user.adminId;
        }
        // console.log(user);
        // adminid="admin";
        const elections = await Election.find({ adminId: adminid });
        // let candidate;
        // const votid="hellp"
        elections.map(async (election: any) => {
            try {
                const candidates = await Candidate.find({ electionId: election.electionId }).sort({ totalVotes: -1 }).limit(1);
                if (candidates.length > 0) {
                    let votid = candidates[0].voterid;
                    // console.log(votid);
                    await Election.updateOne({ _id: election._id }, { $set: { result: votid } });
                    // console.log(el);
                }
            } catch (error) {
                console.error("Error processing election");
            }
        });
        return NextResponse.json({
            elections
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "unable to fetch"
        })
    }
}
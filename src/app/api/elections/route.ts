import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import Admin from "@/models/admin";
import Election from "@/models/election";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    const reqBody = await req.json();
    const { electionname, enddate, admin } = reqBody.form;
    const election = new Election({ electionname, enddate, admin });
    await election.save();
    return NextResponse.json({
        message: "details registered"
    })
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const decode = await getDataFromCookie(req);
        let user;
        if (decode.isAdmin) {
            user = await Admin.findOne({ _id: decode.id });
        }
        else {
            user = await User.findOne({ _id: decode.id });

        }
        const adminid = user.adminid;
        const elections = await Election.find({ admin: adminid });
        console.log(elections);
        return NextResponse.json({
            elections
        })

    } catch (error) {
        return NextResponse.json({
            message: "unable to fetch"
        })
    }
}
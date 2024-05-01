import { dbConnect } from "@/db/dbConn";
import Election from "@/models/election";
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
        const elections = await Election.find();
        return NextResponse.json({
            elections
        })

    } catch (error) {
        return NextResponse.json({
            message: "unable to fetch"
        })
    }
}
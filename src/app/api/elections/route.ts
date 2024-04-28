import { dbConnect } from "@/db/dbConn";
import Election from "@/models/election";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await dbConnect();
    const reqBody = await req.json();
        const { electionname,enddate,admin } = reqBody.form;
        console.log(reqBody);
        const election=new Election({electionname,enddate,admin});
        await election.save();
        return NextResponse.json({
            message:"details registered"
        })
}
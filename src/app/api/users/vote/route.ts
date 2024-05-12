import { dbConnect } from "@/db/dbConn";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    const reqBody = await request.json();
    const {electionid,adminid,admin}= reqBody.form;
    console.log(electionid);
    return NextResponse.json({
        message:"voted successfully"
    })
}
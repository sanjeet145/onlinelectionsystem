import { dbConnect } from "@/db/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Candidate from "@/models/candidate";
import Admin from "@/models/admin";

export async function GET(req: NextRequest) {
    await dbConnect();
    const url = req.url || '';
    try {
        // get the adminid and electionid
        const queryString = url.split('?', 2);
        const cleanedQueryString = queryString[1].substring(0);
        const keyValuePairs = cleanedQueryString.split('&');
        let adminId, electionId,isAdmin;
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key === 'adminid') {
                adminId = value;
            } else if (key === 'electionid') {
                electionId = value;
            }
            else if (key === 'isAdmin') {
                electionId = value;
            }
        });
        if (isAdmin) {
            const adminid= "admin";
            const candidates = await Candidate.find({ adminId: adminid });
            if (candidates) {
                return NextResponse.json({
                    candidates
                })
            }
        }
        const candidates = await Candidate.find({ electionId: electionId, adminId: adminId });
        if (candidates) {
            return NextResponse.json({
                candidates
            })
        }
        else {
            return NextResponse.json({
                message: "No candidates found"
            })
        }

    } catch (error) {
        return NextResponse.json({
            message: error
        })
    }
}
import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Candidate from "@/models/candidate";
import Admin from "@/models/admin";

export async function GET(req: NextRequest) {
    await dbConnect();

    try {

        const decode = await getDataFromCookie(req);
        // console.log(decode);
        if (decode.isAdmin) {
            console.log("admin");
            const admin = await Admin.findOne({ _id: decode.id });
            const adminid=admin.adminId;
            // console.log(admin);
            const candidates = await Candidate.find({ adminId: adminid });
            // console.log(candidates);
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

        }
        else {
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
                return NextResponse.json({
                    candidates
                })
            }
            else {
                return NextResponse.json({
                    message: "No candidates found"
                })
            }
        }

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong"
        })
    }
}
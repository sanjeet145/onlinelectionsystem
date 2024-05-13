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
            return NextResponse.json({
                message:"Canidate not found"
            })
        }
        catch(error){
            return NextResponse.json({
                message:"Something went wrong"
            })
        }
    }
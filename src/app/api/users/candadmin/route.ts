import { dbConnect } from "@/db/dbConn";
// import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Candidate from "@/models/candidate";
import Admin from "@/models/admin";

import jwt from "jsonwebtoken";

const getDataFromCookie = async (request: NextRequest) => {
    const cookie = request.cookies.get("session")?.value || '';
    try {
        if (!cookie) {
            throw new Error('Session cookie not found');
        }
        
        const decoded: any = jwt.verify(cookie, process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        throw error; // Rethrow the error to propagate it further if needed
    }
}


export async function GET(req: NextRequest) {
    await dbConnect();

    try {
       const  data =await getDataFromCookie(req)

        // const decode = await getDataFromCookie(req);
        // console.log(decode);
            // const admin = await Admin.findOne({ _id: decode.id });
            // const adminid=admin.adminId;
            // const adminid= "admin";
            // // console.log(admin);
            // const candidates = await Candidate.find({ adminId: adminid });
            // // console.log(candidates);
            // if (candidates) {
            //     return NextResponse.json({
            //         candidates
            //     })
            // }
            return NextResponse.json({
               data
            })
        }
        catch(error){
            const sec=process.env.JWT_SECRET;
            return NextResponse.json({
                error
            })
        }
    }
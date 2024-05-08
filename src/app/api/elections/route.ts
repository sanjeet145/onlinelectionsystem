import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import Admin from "@/models/admin";
import Election from "@/models/election";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const reqBody = await req.json();
    const { electionname, enddate,electionid } = reqBody.form;
    const decode = await getDataFromCookie(req);
    const admin = await Admin.findOne({_id:decode.id});
    const election = new Election({ electionname, enddate, adminId:admin.adminId, electionId:electionid });
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
            adminid= user.adminId;
        }
        // console.log(user);
        const elections = await Election.find({ admin: adminid });
        // console.log(elections);
        return NextResponse.json({
            elections
        })

    } catch (error) {
        return NextResponse.json({
            message: "unable to fetch"
        })
    }
}
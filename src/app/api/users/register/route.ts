
import { dbConnect } from '@/db/dbConn';
import Admin from '@/models/admin';
import Election from '@/models/election';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { fname, pass, voterId, mobile, adminId } = reqBody.form;
        const voterid = voterId.toLowerCase();
        const adminID = adminId.toLowerCase();
        await dbConnect();
        const admin = await Admin.findOne({ adminid: adminID });
        if (adminID === admin.adminid) {
            if (await User.findOne({ voterid: voterId })) {
                return NextResponse.json({
                    message: "User already exist",
                    success: false
                });
            }
            const elections = await Election.find({admin:adminID});
        const elec = elections.map((election: {
            _id: any;
    }) => (
            {
                electionid: election._id,
            }
        )) 
            const newUser = new User({ fname, voterid, pass, mobile, adminId, Voted:elec })
            await newUser.save();
            return NextResponse.json({
                message: "User Created",
                success: false
            });
        }
        return NextResponse.json({
            message: "Wrong Admin Id",
            success: false
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
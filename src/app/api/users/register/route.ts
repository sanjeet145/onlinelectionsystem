
import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { fname, pass, voterId, mobile } = reqBody.form;
        const voterid = voterId.toLowerCase();
        await dbConnect();
        if (await User.findOne({ voterId })) {
            return NextResponse.json({
                message: "User already exist",
                success: false
            });
        }
        const newUser = new User({ fname, voterid, pass, mobile })
        await newUser.save();
        return NextResponse.json({
            message: "User Created",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
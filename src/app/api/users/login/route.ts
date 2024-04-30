import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export async function POST(req: NextRequest) {
    await dbConnect();
    const reqBody = await req.json();
    const { voter, pass } = reqBody.form;
    const voteri =voter.toLowerCase();
    const user = await User.findOne({ voterid: voteri });
    if (user) {
        if (pass == user.pass) {
            const response= NextResponse.json({
                message:"logged in",
                success: true,
            })
            const tokenData = {
                id: user._id,
                username: user.voterid,
            }
            const token = await jwt.sign(tokenData,
                process.env.JWT_SECRET!,
                { expiresIn: "1h" })
            response.cookies.set("session",token, {
                httpOnly:true,
                path:'/'
            })
            return response;
        }
        
    }
    return NextResponse.json({
        message: "Username or Password is wrong",
        success: false,
    })
}


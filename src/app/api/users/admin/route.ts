import { dbConnect } from '@/db/dbConn';
import Admin from '@/models/admin';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req:NextRequest){
    await dbConnect();
    const reqBody = await req.json();
        const { voter,pass } = reqBody.form;
        const voterid = voter.toLowerCase();
        const user = await Admin.findOne({adminid: voterid});
        if(user){
            if(pass==user.pass){
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
            return NextResponse.json({
                message:"Username or password is wrong",
                success:false,
            })
        }

        return NextResponse.json({
            message:"You are not Admin",
            success:false,
        })
}
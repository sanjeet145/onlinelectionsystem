import { dbConnect } from '@/db/dbConn';
import Admin from '@/models/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest){
    await dbConnect();
    const reqBody = await req.json();
        const { voter,pass } = reqBody.form;
        const voterid = voter.toLowerCase();
        const user = await Admin.findOne({voterid});
        if(user){
            if(pass==user.pass){
                return NextResponse.json({
                    success:true,
                })
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
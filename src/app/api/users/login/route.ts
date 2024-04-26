import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { useRouter} from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest){
    await dbConnect();
    const reqBody = await req.json();
        const { voter,pass } = reqBody.form;
        const user = await User.findOne({voterid:voter});
        if(user){
            if(pass==user.pass){
                return NextResponse.json({
                    success:true,
                })
            }
        }
        return NextResponse.json({
            message:"Username or Password is wrong",
            success:false,
        })
}
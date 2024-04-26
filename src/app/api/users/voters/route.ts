import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    await dbConnect();
    const voters = await User.find({});
    const users = voters.map((voter: { mobile: any; voterid: any; fname: any; }) => (
        {
            fname: voter.fname,
            voterid: voter.voterid,
            mobile: voter.mobile
        }
    ))
    return NextResponse.json({
        users
    })
}
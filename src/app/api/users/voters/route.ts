import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    await dbConnect();
    const voters = await User.find({});
    const users = voters.map((voter: {
        isAdmin: Boolean;
        isVerified:Boolean;
        isCandidate: Boolean;
        isVoted: Boolean; mobile: any; voterid: any; fname: any; 
}) => (
        {
            fname: voter.fname,
            voterid: voter.voterid,
            mobile: voter.mobile,
            isVoted: voter.isVoted,
            isCandidate: voter.isCandidate,
            isAdmin:voter.isAdmin,
            isVerified:voter.isVerified,
        }
    ))
    return NextResponse.json({
        users
    })
}
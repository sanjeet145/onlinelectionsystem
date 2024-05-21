import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromCookie } from '@/helpers/getDataFromCookie';
import Admin from '@/models/admin';

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const decode = await getDataFromCookie(req);
        const admin = await Admin.findOne({ _id: decode.id });
        const voters = await User.find({ adminId: admin.adminId });
        const users = voters
            .filter((voter: {
                isVerified: Boolean;
            }) => voter.isVerified)
            .map((voter: {
                isAdmin: Boolean;
                isVerified: Boolean;
                isCandidate: Boolean;
                isVoted: Boolean; mobile: any; voterid: any; fname: any;
            }) => ({
                fname: voter.fname,
                voterid: voter.voterid,
                mobile: voter.mobile,
                isVoted: voter.isVoted,
                isCandidate: voter.isCandidate,
                isAdmin: voter.isAdmin,
                isVerified: voter.isVerified,
            }));

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ message: error });

        // return NextResponse.json({ message: "Something went wrong" });
    }
}
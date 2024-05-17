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
            }) => !voter.isVerified)
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
        return NextResponse.json({ message: "Something went wrong" });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const reqBody = await req.json();
        const { voterid } = reqBody.form;
        const decode = await getDataFromCookie(req);
        const admin = await Admin.findOne({ _id: decode.id });
        const voter = await User.findOne({ voterid });
        if (decode.isAdmin && admin.adminId === voter.adminId) {
            const updated = await User.findOneAndUpdate(
                { voterid },
                { isVerified: true },
                { new: true }
            );

            if (updated) {
                return NextResponse.json({ message: "Voter approved", voter: updated });
            } else {
                return NextResponse.json({ message: "Voter not found" });
            }
        } else {
            return NextResponse.json({ message: "Unauthorized action or voter not found" });
        }


    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" });
    }
} 
import { dbConnect } from '@/db/dbConn';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromCookie } from '@/helpers/getDataFromCookie';
import Admin from '@/models/admin';
import Candidate from '@/models/candidate';

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
        const { voterid,electionId } = reqBody.form;
        const decode = await getDataFromCookie(req);
        const admin = await Admin.findOne({ _id: decode.id });
        // const adminid = admin.adminId;
        const candidate = await Candidate.findOne({ voterid, electionId});
        if (decode.isAdmin && admin.adminId === candidate.adminId) {
            const updated = await Candidate.findOneAndUpdate(
                { voterid },
                { isCandidate: true },
                { new: true }
            );

            if (updated) {
                return NextResponse.json({ message: "Candidate approved" });
            } else {
                return NextResponse.json({ message: "Candidate not found" });
            }
        } else {
            return NextResponse.json({ message: "Unauthorized action or voter not found" });
        }


    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" });
    }
} 
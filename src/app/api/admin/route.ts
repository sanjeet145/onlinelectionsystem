import { dbConnect } from '@/db/dbConn';
import Admin from '@/models/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await dbConnect();
    const reqBody = await req.json();
    const { fname, pass, passKey, adminid, mobile } = reqBody.form;
    if (!adminid) {
        return NextResponse.json({
            message: "Admin ID is required",
            success: false
        });
    }

    if (passKey === process.env.PASS_KEY) {
        const adminId = adminid.toLowerCase();
        if (await Admin.findOne({ adminId })) {
            return NextResponse.json({
                message:"Admin id Exist please try the different adminId",
                success:false,
            })
        }
        const neAdmin = new Admin({ fname, adminId, pass, mobile });
        await neAdmin.save();
        return NextResponse.json({
            message: "Admin Created",
            success: true
        });

    }
    else{
            return NextResponse.json({
                message:"Incorrect PassKey please contact the superAdmin",
                success:false,
            })

    }
}
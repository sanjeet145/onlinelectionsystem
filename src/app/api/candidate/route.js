import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { dbConnect } from "@/db/dbConn";
import Candidate from "@/models/candidate";
import Admin from "@/models/admin";
import User from "@/models/user";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";


const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadFileToS3(file, fileName) {
    const fileBuffer = file;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `candidates/${fileName}`,
        Body: fileBuffer,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;
}

export async function POST(req) {
    await dbConnect();
    try {
        const formData = await req.formData();
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        const electionid = formData.get("electionid");

        const decode = await getDataFromCookie(req);
        const user = await User.findOne({ _id: decode.id });
        const candidate = await Candidate.findOne({ electionId: electionid, voterid: user.voterid, adminId: user.adminId });
        if (candidate) {
            if (candidate.isRequested) {
                console.log("already a candidate requested of this election");
                return NextResponse.json({
                    message: "ALready requested",
                    success: "false",
                })
            }
            return NextResponse.json({
                message: "Already candidate",
                success: "false",
            })
        }

        else {
            const partyname = formData.get("partyname");
            const partysymbol = formData.get("partysymbol");
            const description = formData.get("description");
            const file = formData.get("candidateimage");
            console.log(file);
            if (!file) {
                return NextResponse.json({
                    message: "invalid file",
                    success: false,
                })
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            const imgname = electionid + user.voterid;
            const fileName = await uploadFileToS3(buffer, imgname);
            const voterid = user.voterid;
            const admin = user.adminId;
            const url = `https://onlineelectionsystem.s3.amazonaws.com/candidates/${fileName}`
            const candidat = new Candidate({ voterid, electionId: electionid, adminId: admin, partyname, partysymbol, description, imgurl: url });
            await candidat.save();
            return NextResponse.json({
                message: "Candidate request sent",
                success: "true",
            });
        }

    } catch (error) {
        return NextResponse.json({
            message: "Unable to upload",
            success: false,
        })
    }
}

export async function GET(req) {
    await dbConnect();
    try {
        const decode = await getDataFromCookie(req);
        console.log(decode);
        const admin = await Admin.findOne({ _id: decode.id });
        const adminid = admin.adminId;
        // console.log(admin);
        const candidates = await Candidate.find({ adminId: adminid });
        // console.log(candidates);
        if (candidates) {
            return NextResponse.json({
                candidates
            })
        }
        else {
            return NextResponse.json({
                message: "Candidate not found"
            })
        }
    }
    catch (error) {
        const sec = process.env.JWT_SECRET;
        return NextResponse.json({
            error
        })
    }
}

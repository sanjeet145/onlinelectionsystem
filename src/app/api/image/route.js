import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region:process.env.AWS_S3_REGION,
    credentials:{
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

async function uploadFileToS3(file, fileName){
    const fileBuffer= file;
    const params = {
        Bucket:process.env.AWS_S3_BUCKET_NAME,
        Key:`candidates/${fileName}`,
        Body:fileBuffer,
        ContentType:"image/jpg"
    }
    const command= new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;
}

export async function POST(req){
    try {
        const formData = await req.formData();
        console.log(formData);
        const file = formData.get("file");
        if(!file){
            return NextResponse.json({
                message:"invalid file",
                success:false,
            })
        }
        const buffer =Buffer.from(await file.arrayBuffer());
        const fileName= await uploadFileToS3(buffer, file.name);
        return NextResponse.json({
            message:"Successfully uploaded",
            success:true,
        })
        
    } catch (error) {
        return NextResponse.json({
            message:"Unable to upload",
            success:false,
        })
    }
}

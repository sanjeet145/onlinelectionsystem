import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    // const decode= await getDataFromCookie(request);
     return NextResponse.json({
            isCandidate: true,
        })
    // return NextResponse.json({
    //     isCandidate: decode.isCandidate,
    // })
}
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response =NextResponse.json({
            message:"logged out successfull",
            success:true,
        })
        response.cookies.delete("session");
        return response;
    } catch (error) {
        return NextResponse.json({
            message:"unable to logout",
            success:false,
        })
    }
}
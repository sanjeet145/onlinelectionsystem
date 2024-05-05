import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { constrainedMemory } from "process";

export async function GET(request: NextRequest) {
    await dbConnect(); 
    const decode = await getDataFromCookie(request);
    try {
        const deleted= await User.findOneAndDelete({_id:decode.id});
        if(deleted){
            const response= NextResponse.json({
                message: "User deleted successfully",
                success: true
            });
            response.cookies.delete("session");
            return response;
        }
        return NextResponse.json({
            message: "User not found",
            success: false
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            success: false
        });
    }
}
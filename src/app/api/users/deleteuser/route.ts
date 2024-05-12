import { dbConnect } from "@/db/dbConn";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import Admin from "@/models/admin";
import Election from "@/models/election";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect(); 
    const decode = await getDataFromCookie(request);
    try {
        let deleted;
        console.log("try");
        if(!decode.isAdmin){
            //delete user and candidate
            deleted =await User.findOneAndDelete({_id:decode.id});
            console.log("deleted");
        }
        else{
            //delete admin, user,election,candidate under that admin
            const admin = await Admin.findOne({_id:decode.id});
            await Election.deleteMany({adminId:admin.adminId});
            await User.deleteMany({adminId:admin.adminId});
            //  await Candidate.deleteMany({adminId:admin.adminId});
            deleted =await Admin.findOneAndDelete({_id:decode.id});
           console.log(decode);
            console.log(admin);
           
        }
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
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong",
            success: false
        });
    }
}
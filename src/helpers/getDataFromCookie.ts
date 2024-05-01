import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromCookie = async (request: NextRequest) => {
    try {
        const cookie = request.cookies.get("session")?.value || '';
        const decoded:any= jwt.verify(cookie,process.env.JWT_SECRET!);
        return (decoded);

    } catch (error) {
        console.log("error");
    }
}


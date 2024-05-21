import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromCookie = async (request: NextRequest) => {
    const cookie = await request.cookies.get("session")?.value || '';
    try {
        const decoded:any= jwt.verify(cookie,process.env.JWT_SECRET!);
        return (decoded);

    } catch (error) {
        console.log("Error decoding the cookie");
    }
}


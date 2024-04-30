import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromCookie = async (request: NextRequest) => {
    try {
        const cookie = request.cookies.get("session")?.value || '';
        const decoded= jwt.verify(cookie,process.env.JWT_SECRET!);
        console.log(decoded);
        // return (decoded.id);

    } catch (error) {
        console.log(error);
    }
}


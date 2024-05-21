import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getDataFromCookie = async (request: NextRequest) => {
    try {
        const cookie = request.cookies.get("session")?.value || '';
        const decodes:any =jwtDecode(cookie);
        const decoded:any= jwt.verify(cookie,process.env.JWT_SECRET!);
        return (decodes);

    } catch (error) {
        console.log("error");
    }
}


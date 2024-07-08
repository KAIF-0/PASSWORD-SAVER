import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


const verifyJWT = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

export async function GET(request, { params }) {
    const cookieStore = cookies();
    const cookie = cookieStore.get('authToken');

    try {
        if (cookie) {
            const { value } = cookie;
            const token = value;

            const user = await verifyJWT(token, process.env.JWT_SECRET);

            const passwords = await prisma.password.findMany({ where: { userid: user.userid } })

            if (passwords) {
                const data = passwords
                return NextResponse.json(data, { status: 200 });
            } else {
                return NextResponse.json({ message: "No documents found" }, { status: 404 });
            }
        } else {
            return NextResponse.json(
                { message: "You are not logged in" },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }

}

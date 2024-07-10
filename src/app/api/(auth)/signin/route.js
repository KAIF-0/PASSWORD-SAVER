
import { NextResponse } from "next/server"
import { account, ID } from "@/app/appwrite";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';


export async function POST(request) {
    let data = await request.json()
    let { email, password } = data
    const cookie = cookies()
    try {
        let user = await account.createEmailPasswordSession(email, password)
    if (user) {
        const token = jwt.sign(
            { userid: user.userId },
            process.env.JWT_SECRET,
        )
        cookie.set('authToken', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
        });
        return NextResponse.json({ message: "Sign In successfull!" }, {
            status: 200
        })
    } 
    } catch (error) {
        return NextResponse.json({message:error.message},
            {status: 400}
        )
        
    }
    

}
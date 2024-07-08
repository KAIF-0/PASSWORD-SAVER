
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";

export async function POST(request) {
    let data = await request.json()
    try {
        const password = await prisma.password.create({
            data : {
                ...data
            }
        })
        if (password) {
            return NextResponse.json({ message: "success" }, { status: 200 })

        } else {
            return NextResponse.json({ message: "error" }, { status: 500 })
        }

    } catch (error) {
        return NextResponse.json({ message: error.message },
            { status: 400 }
        )

    }


}
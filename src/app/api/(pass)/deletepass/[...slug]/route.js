import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";


export async function DELETE(request, { params }) {

    const { slug } = params;
    const id = slug[0];
    try {
        const deletePass = await prisma.password.delete({
            where: {
              id: parseInt(id),
            },
          })
        if (deletePass) {
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

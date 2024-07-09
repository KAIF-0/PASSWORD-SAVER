import { NextResponse } from "next/server"
import { cookies } from "next/headers";


export async function PUT(request) {
    const cookie = cookies();
    cookie.delete('authToken')
    return NextResponse.json({ message: "Signed out" }, { status: 200 });
}
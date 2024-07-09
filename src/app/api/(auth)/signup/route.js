//sign up using appwrite
import { NextResponse } from "next/server"
import { account, ID } from "@/app/appwrite";

export async function POST(request) {
    let data = await request.json()
    const {email, password} = data

    try {
      const session = await account.create(ID.unique(), email, password);
      if(session){
        return NextResponse.json({message: "Account created!"},
          {status: 200}
        )
      }
      
    } catch (error) {
      return NextResponse.json({message:error.message},
        {status: 400}
      )
    }
  
  }
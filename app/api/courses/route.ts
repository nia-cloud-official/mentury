import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"

export async function POST (
    req: Request
) {
    try {
        const { userId } = auth()
        const { title } = await req.json()
        if (!userId) throw new Error("Unauthorized")
        const course = await db.course.create({
            data: { userId, title }
        })
        return NextResponse.json(course)
    } catch (error) {
        console.log("Courses POST error: ", error)
        return new NextResponse(
            "Something went wrong. Please try again later.",
            { status: 500 }
        )
    } 
}
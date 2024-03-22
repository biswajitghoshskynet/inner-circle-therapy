import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbconnect";
import { User } from "@/lib/models/user";
import mongoose from "mongoose";
export async function POST(req) {
    let result = null
    const payload = await req.json()
    try {
        await mongoose.connect(dbConnect)
        let userVerefy = await User.findOne({ email: payload.email })

        if (userVerefy?.email == payload.email) {
            result = { success: false, message: 'User already exist' }
        }
        else {
            let newUser = new User(payload)
            let data = await newUser.save()
            result = { success: true, status: 201, data: data }
        }

    } catch (error) {
        result = { success: false, error }
    }

    return NextResponse.json(result, { status: 201 })
}
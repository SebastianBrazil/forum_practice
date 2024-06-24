import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const formData = await request.json();

    console.log("body: ", formData)

    return NextResponse.json({status: 200, data: `${formData.first} ${formData.last}` })
}

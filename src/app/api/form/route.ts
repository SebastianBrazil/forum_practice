import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const formData = await request.json();
    return NextResponse.json({ status: 200, data: formData })
}

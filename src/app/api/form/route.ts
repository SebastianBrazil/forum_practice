import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const formData = await request.json();

    if (!formData.firstN || !formData.lastN) {
        return NextResponse.json({ status: 400, data: `Required Form Data Missing` })
    }

    return NextResponse.json({ status: 200, data: formData })
}

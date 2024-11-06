import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const json = {}

    return NextResponse.json(json);
}

export async function POST(request: NextRequest) {
    const { promptBody } = await request.json();
    if (!promptBody) {
        return new NextResponse(
            JSON.stringify({ error: "No Prompt Provided" }),
            { status: 400 }
        );
    }

    return new NextResponse(JSON.stringify({}), { status: 201, });
}
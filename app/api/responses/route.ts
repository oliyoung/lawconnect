import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const promptId = request.nextUrl.searchParams.get("promptId");
    const json = {
        promptId
    }

    return NextResponse.json(json);
}

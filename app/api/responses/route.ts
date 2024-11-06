"use server";
import { eq } from "drizzle-orm";
import db from "@/db";

import { responses } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const promptId = request.nextUrl.searchParams.get("promptId");
    if (!promptId) {
        return new NextResponse(
            JSON.stringify({ error: "No Prompt Provided" }),
            { status: 400 }
        );
    }
    const data = await db.select().from(responses).where(eq(responses.promptId, Number(promptId)));
    return new NextResponse(JSON.stringify(data));
}

"use server";

import db from "@/app/db";
import { eq } from "drizzle-orm";
import { prompts, responses } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const promptId = request.nextUrl.searchParams.get("promptId");

    try {
        const selectResponse = await db.select().from(prompts).where(eq(prompts.id, Number(promptId)));
        return new NextResponse(JSON.stringify(selectResponse));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    const { body } = await request.json();
    if (!body) {
        return new NextResponse(
            JSON.stringify({ error: "No Prompt Provided" }),
            { status: 400 }
        );
    }

    try {
        const insertResponse = await db.insert(prompts).values({ body }).returning();
        return new NextResponse(JSON.stringify(insertResponse), { status: 201, });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    const promptId = Number(request.nextUrl.searchParams.get("promptId"));

    const { body } = await request.json();
    if (!body) {
        return new NextResponse(
            JSON.stringify({ error: "No Prompt Provided" }),
            { status: 400 }
        );
    }

    try {
        const updatePrompt = await db.update(prompts).set({ body }).returning();
        const deleteResponses = await db.delete(responses).where(eq(responses.promptId, promptId));
        return new NextResponse(JSON.stringify(updatePrompt), { status: 202 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 400 });
    }
}
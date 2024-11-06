"use server";

import db from "@/app/db";
import { eq } from "drizzle-orm";
import { prompts, responses } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/openai";

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
        await db.insert(prompts).values({ body }).returning();
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: body },]
        }).asResponse();
        const json = await response.json();
        const message = json.choices[0].message;
        return new NextResponse(JSON.stringify(message));
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
"use server";

import db from "@/db";
import { prompts, responses } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/openai";

export async function GET() {
    try {
        const selectResponse = await db.select().from(prompts);
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
        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: body },]
        }).asResponse();
        const json = await response.json();
        const message = json.choices[0].message;

        const insertPromptResponse = await db
            .insert(prompts)
            .values({ body, createdAt: new Date().toISOString() })
            .returning();
        const prompt = insertPromptResponse[0]
        await db.insert(responses)
            .values({ body, promptId: prompt.id, createdAt: new Date().toISOString() })
            .returning();
        return new NextResponse(JSON.stringify({ prompt, response: message.content }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 400 });
    }
}


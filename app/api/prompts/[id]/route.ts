import db from "@/db";
import { eq } from "drizzle-orm";
import { prompts, responses } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const selectResponse = await db.select().from(prompts).where(eq(prompts.id, Number(id)))

        const prompt = selectResponse[0];

        const responsesResponse = await db.select().from(responses).where(eq(responses.promptId, Number(id)))
        return new NextResponse(JSON.stringify({ prompt, responses: responsesResponse.map(r => r.body) }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 400 });
    }
}

export async function PUT(request: Request, { params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { body } = await request.json();
    if (!body || !id) {
        return new NextResponse(
            JSON.stringify({ error: "No Prompt Provided" }),
            { status: 400 }
        );
    }

    try {
        const updatePrompt = await db.update(prompts).set({ body }).returning();
        await db.delete(responses).where(eq(responses.promptId, Number(id)));
        return new NextResponse(JSON.stringify(updatePrompt), { status: 202 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 400 });
    }
}
// app/api/chat/route.ts
import { groq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;
export const runtime = "edge";

export async function POST(req) {
    const { messages } = await req.json();

    const result = streamText({
        model: groq("qwen/qwen3-32b"),
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}

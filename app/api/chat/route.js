import { triageAgent } from "@/lib/ai/agent";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Convert history to LangChain message format
    const formattedHistory = (history || []).map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      }
      return new AIMessage(msg.content);
    });

    // Invoke the agent with history
    const response = await triageAgent.invoke({
      messages: [...formattedHistory, new HumanMessage(message)],
    });

    // Extract the last AI message
    const lastMessage = response.messages[response.messages.length - 1];

    return NextResponse.json({
      text: lastMessage.content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

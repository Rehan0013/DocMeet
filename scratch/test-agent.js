import { triageAgent } from "../lib/ai/agent.js";
import { HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const threadId = "test-session-" + Date.now();
  const config = { configurable: { thread_id: threadId } };

  console.log("--- First Message ---");
  const res1 = await triageAgent.invoke(
    { messages: [new HumanMessage("I have a severe headache and some nausea.")] },
    config
  );
  console.log("AI:", res1.messages[res1.messages.length - 1].content);

  console.log("\n--- Second Message (Context Test) ---");
  const res2 = await triageAgent.invoke(
    { messages: [new HumanMessage("It's been happening for 2 days, mostly in the morning.")] },
    config
  );
  console.log("AI:", res2.messages[res2.messages.length - 1].content);
}

test().catch(console.error);

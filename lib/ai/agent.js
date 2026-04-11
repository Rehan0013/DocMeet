import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, Annotation, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { doctorSearchTool } from "./tools.js";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

// Define the model
// Use gemini-1.5-flash as a fallback if 2.5/2.0 fails, but keeping user's preferred version
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // Reverting to 1.5-flash for maximum stability on Vercel
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.2,
});

// Bind tools to the model
const tools = [doctorSearchTool];
const modelWithTools = model.bindTools(tools);

// Define the system prompt (Preserving user's recent update)
const SYSTEM_PROMPT = `
You are DocMeet AI, a professional medical triage assistant.
Your goal is to help users identify their medical concerns, provide preliminary first aid advice, providing first step to relief the pain is neccessary and you will also explain the problem in summary to the user, and recommend the right type of doctor.

STRICT WORKFLOW:
1. Greet the user and ask about their symptoms if they haven't provided them yet.
2. Ask 2-3 focused follow-up questions to narrow down the problem and identify the likely medical specialty needed.
3. Once you have enough information:
   a. Use the 'doctor_search' tool to find 3-4 doctors for the identified specialty.
   b. Provide a concise summary of their symptoms.
   c. Provide immediate first aid suggestions and what to avoid.
   d. List the recommended doctors. Format the doctor list as a valid JSON array within a markdown code block labeled 'DOCTORS_JSON' at the very end of your response. 
      The JSON should look like: \`\`\`DOCTORS_JSON [ { "id": "...", "name": "...", "specialty": "...", "imageUrl": "..." } ] \`\`\`
4. Always maintain a professional, empathetic, and helpful tone.
5. IMPORTANT: Include a disclaimer that you are an AI assistant and not a replacement for professional medical advice.

Wait for user input after each step until you are ready to search for doctors.
`;

// Define the function that calls the model
async function callModel(state) {
  const { messages } = state;
  const result = await modelWithTools.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    ...messages
  ]);
  return { messages: [result] };
}

// Define the function for the tool node
const toolNode = new ToolNode(tools);

// Define the logic to decide whether to continue or stop
function shouldContinue(state) {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.tool_calls?.length > 0) {
    return "tools";
  }
  return "__end__";
}

// Create the graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent");

// Compile the graph without checkpointer for stateless execution in Route Handlers
export const triageAgent = workflow.compile();

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import { triageAgent } from "./lib/ai/agent.js";
import { HumanMessage } from "@langchain/core/messages";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("chat_message", async (data) => {
      try {
        const { text, threadId } = data;
        
        // Config for LangGraph memory
        const config = {
          configurable: {
            thread_id: threadId || socket.id,
          },
        };

        // Invoke the agent
        const result = await triageAgent.invoke(
          {
            messages: [new HumanMessage(text)],
          },
          config
        );

        // Get the last message from the agent
        const lastMessage = result.messages[result.messages.length - 1];
        
        // Emit back to user
        socket.emit("ai_message", {
          text: lastMessage.content,
          type: "text",
        });

        // Check if there are tool outputs that we might want to display specifically
        // In this implementation, the result.messages already contains the AI's final summary 
        // including doctor recommendations if the tool was called.

      } catch (error) {
        console.error("Error in chat_message handler:", error);
        socket.emit("ai_message", {
          text: "I'm sorry, I encountered an error processing your request. Please try again.",
          type: "error",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, X, Send, Bot, User, Stethoscope, Loader2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, I am DocMeet AI. Please describe your symptoms and problems to get first aid, what to avoid, and doctor recommendations.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const newSocket = io(window.location.origin);
    setSocket(newSocket);

    newSocket.on("ai_message", (data) => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text,
          timestamp: new Date(),
        },
      ]);
    });

    return () => newSocket.close();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !socket) return;

    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("chat_message", { text: inputValue, threadId: socket.id });
    setInputValue("");
    setIsLoading(true);
  };

  const parseMessage = (content) => {
    const doctorsMatch = content.match(/```DOCTORS_JSON\s*([\s\S]*?)\s*```/);
    let doctors = [];
    let textContent = content;

    if (doctorsMatch) {
      try {
        doctors = JSON.parse(doctorsMatch[1]);
        textContent = content.replace(doctorsMatch[0], "").trim();
      } catch (e) {
        console.error("Failed to parse doctors JSON", e);
      }
    }

    return { textContent, doctors };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            <div className="absolute -top-12 right-0 bg-emerald-600 text-white text-xs py-1 px-3 rounded-full shadow-lg whitespace-nowrap animate-bounce">
              AI Help?
            </div>
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-2xl flex items-center justify-center p-0 overflow-hidden group"
            >
              <MessageCircle className="w-8 h-8 text-white transition-transform group-hover:scale-110" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="bg-card border-emerald-900/20 border shadow-2xl rounded-2xl w-[380px] sm:w-[420px] max-h-[600px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">DocMeet Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-[10px] text-emerald-100 font-medium">Always Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 text-white p-0 h-8 w-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] scrollbar-thin scrollbar-thumb-emerald-900/20">
              {messages.map((msg, idx) => {
                const { textContent, doctors } = parseMessage(msg.content);
                return (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] flex gap-2 ${
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.role === "user" ? "bg-emerald-100 text-emerald-700" : "bg-emerald-900/20 text-emerald-400"
                      }`}>
                        {msg.role === "user" ? <User size={16} /> : <Stethoscope size={16} />}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div
                          className={`p-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-emerald-600 text-white rounded-tr-none"
                              : "bg-muted/50 text-foreground border border-emerald-900/10 rounded-tl-none whitespace-pre-wrap"
                          }`}
                        >
                          {textContent}
                        </div>
                        
                        {doctors.length > 0 && (
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            {doctors.map((doc) => (
                              <Card key={doc.id} className="border-emerald-900/20 overflow-hidden hover:border-emerald-700/40 transition-all">
                                <CardContent className="p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center overflow-hidden">
                                      {doc.imageUrl ? (
                                        <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                                      ) : (
                                        <User size={16} className="text-emerald-400" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-xs truncate">{doc.name}</h4>
                                      <p className="text-[10px] text-muted-foreground truncate">{doc.specialty}</p>
                                    </div>
                                    <Button asChild size="sm" className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700">
                                      <Link href={`/doctors/${doc.specialty}/${doc.id}`}>
                                        Book
                                      </Link>
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/20 flex items-center justify-center">
                      <Stethoscope size={16} className="text-emerald-400" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none border border-emerald-900/10 flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-emerald-600" />
                      <span className="text-xs text-muted-foreground">Analysing symptoms...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-emerald-900/10 flex gap-2 bg-muted/20">
              <input
                type="text"
                placeholder="Type your symptoms..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-background border border-emerald-900/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ReviewCarousel({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  // Clone reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Decorative Gradients for Fade Effect at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 30, // adjust speed as needed
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-[350px] md:w-[450px]"
          >
            <Card className="h-full border-emerald-900/20 bg-emerald-900/10 backdrop-blur-sm hover:bg-emerald-900/20 transition-all duration-500 group">
              <CardContent className="p-8 flex flex-col justify-between h-full whitespace-normal relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-emerald-500/10 p-2 rounded-lg">
                      <Quote className="w-6 h-6 text-emerald-400 rotate-180" />
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-emerald-900/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed italic mb-8 line-clamp-4 relative z-10">
                    &quot;{review.comment}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t pt-6 border-emerald-900/20 mt-auto">
                  <Avatar className="h-12 w-12 border-2 border-emerald-500/20">
                    <AvatarImage src={review.patient.imageUrl} alt={review.patient.name} />
                    <AvatarFallback className="bg-emerald-900/40 text-emerald-400 font-bold">
                      {review.patient.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-wider text-sm">
                      {review.patient.name}
                    </h4>
                    <p className="text-xs text-emerald-500/80 font-medium mt-0.5">
                      Consulted with <span className="text-emerald-400">Dr. {review.doctor.name}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

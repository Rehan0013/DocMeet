"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ReviewCarousel({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  // Clone reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="w-full overflow-hidden py-24 relative">
      {/* Decorative Gradients for Fade Effect at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-12 whitespace-nowrap px-4"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 60, // Much slower, more premium speed
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedReviews.map((review, index) => (
          <motion.div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-[450px] group"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="h-full glass-card p-12 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 group-hover:bg-card group-hover:border-primary/20 group-hover:shadow-[0_0_50px_rgba(139,214,182,0.1)]">
              {/* Massive subtle quote watermark */}
              <Quote className="absolute -top-8 -right-8 w-40 h-40 opacity-[0.02] text-primary rotate-12 transition-transform group-hover:rotate-0 duration-1000" />

              <div className="flex flex-col h-full whitespace-normal relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-primary/10 ring-8 ring-primary/5 shadow-2xl transition-all duration-500 group-hover:ring-primary/10">
                        <AvatarImage src={review.patient?.imageUrl} />
                        <AvatarFallback className="bg-primary/10 text-primary font-headline text-lg font-bold">
                          {review.patient?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 border-4 border-card shadow-xl group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-xl text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {review.patient?.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating ? "text-secondary fill-secondary" : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-[0.25em] ml-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed font-sans italic relative">
                  <span className="text-3xl text-primary/20 absolute -left-6 -top-2 font-serif">&ldquo;</span>
                  {review.comment}
                  <span className="text-3xl text-primary/20 absolute -right-4 -bottom-6 font-serif">&rdquo;</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

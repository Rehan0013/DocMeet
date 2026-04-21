"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ReviewCarousel({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  // Clone reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="w-full overflow-hidden py-12 relative">
      {/* Decorative Gradients for Fade Effect at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap px-4"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 40, // Slower, more professional speed
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }} // Pause on hover for better readability
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-[400px] md:w-[500px]"
          >
            <Card className="h-full border border-emerald-900/30 bg-emerald-950/30 backdrop-blur-xl hover:bg-emerald-900/10 hover:border-emerald-700/50 transition-all duration-500 overflow-hidden group">
              <CardContent className="p-10 flex flex-col justify-between h-full whitespace-normal relative">
                {/* Large Watermark Quote */}
                <Quote className="absolute -right-6 -top-6 w-32 h-32 text-emerald-500/[0.03] rotate-12 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-emerald-400 fill-emerald-400/20"
                              : "text-emerald-900/40"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="bg-emerald-900/20 border-emerald-900/40 text-[10px] uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5">
                      Verified Review
                    </Badge>
                  </div>
                  
                  <p className="text-white/90 text-xl font-medium leading-relaxed mb-10 tracking-tight">
                    &quot;{review.comment}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-5 border-t border-emerald-900/20 pt-8 mt-auto relative z-10">
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-emerald-500/30 shadow-xl">
                      <AvatarImage src={review.patient.imageUrl} alt={review.patient.name} className="object-cover" />
                      <AvatarFallback className="bg-emerald-900/60 text-emerald-400 text-lg font-bold">
                        {review.patient.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-background shadow-lg">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                      {review.patient.name}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                      Patient <span className="w-1 h-1 rounded-full bg-emerald-900/60" /> 
                      <span className="text-emerald-500/90 tracking-tight">Dr. {review.doctor.name}</span>
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

// Helper icons needed but not imported in previous view_file (assuming they are standardized or I'll add them)
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

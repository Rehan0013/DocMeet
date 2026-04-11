"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { submitReview } from "@/actions/reviews";
import { toast } from "sonner";
import { motion } from "framer-motion";

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!appointmentId) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Invalid Review Link</h1>
        <p className="text-muted-foreground mt-2">Please use the link provided in your email.</p>
        <Button onClick={() => router.push("/appointments")} className="mt-4">
          Go to Appointments
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("appointmentId", appointmentId);
      formData.append("rating", rating.toString());
      formData.append("comment", comment);

      const result = await submitReview(formData);
      if (result.success) {
        toast.success("Thank you! Your review has been submitted.");
        router.push("/appointments");
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl border-primary/10">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Star className="w-8 h-8 text-primary fill-primary" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Rate Your Consultation
            </CardTitle>
            <CardDescription className="text-lg">
              How was your experience? Your feedback helps us improve and assists others in finding the right care.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <p className="font-semibold text-muted-foreground uppercase tracking-widest text-sm">Select Star Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          (hoveredRating || rating) >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-primary font-medium italic animate-pulse">
                    {rating === 5 ? "Exceptional!" : rating === 4 ? "Great Experience" : rating === 3 ? "Good" : rating === 2 ? "Could be better" : "Disappointing"}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                  Share your thoughts (Optional)
                </label>
                <Textarea
                  placeholder="Tell us what you liked or how we can improve..."
                  className="min-h-[150px] resize-none focus:ring-2 focus:ring-primary border-primary/20 text-lg"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all rounded-xl"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                By submitting, you agree that your review is honest and based on your actual experience.
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4" />
        <div className="h-8 w-48 bg-muted mx-auto mb-2" />
        <div className="h-4 w-64 bg-muted mx-auto" />
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}

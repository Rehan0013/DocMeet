import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Stethoscope, ShieldCheck, Users, Clock, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/pricing";
import { creditBenefits, features } from "@/lib/data";
import { getTopReviews } from "@/actions/reviews";
import ReviewCarousel from "@/components/review-carousel";

export default async function Home() {
  const { reviews } = await getTopReviews();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section - Centered & Premium */}
      <section className="relative pt-32 pb-24 overflow-hidden technical-grid">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] -z-10 rounded-full" />

        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="outline"
            className="bg-emerald-900/30 border-emerald-700/30 px-6 py-2 text-emerald-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000"
          >
            The Future of Healthcare is Here
          </Badge>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            Connect with <span className="medical-glow-text">experts</span> <br />
            whenever you need.
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Secure, professional medical consultations from the comfort of your home.
            Book top-rated doctors and manage your health journey in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              asChild
              size="xl"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-lg rounded-md shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/onboarding">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-primary/20 hover:bg-muted text-foreground px-8 h-14 text-lg rounded-md"
            >
              <Link href="/doctors">Find a Doctor</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-y border-emerald-900/20 py-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1">50+</span>
              <span className="text-sm text-muted-foreground">Specialists</span>
            </div>
            <div className="flex flex-col items-center border-l border-emerald-900/20">
              <span className="text-2xl font-bold text-white mb-1">100+</span>
              <span className="text-sm text-muted-foreground">Patients</span>
            </div>
            <div className="flex flex-col items-center border-l md:border-l border-emerald-900/20">
              <span className="text-2xl font-bold text-white mb-1">24/7</span>
              <span className="text-sm text-muted-foreground">Availability</span>
            </div>
            <div className="flex flex-col items-center border-l border-emerald-900/20">
              <span className="text-2xl font-bold text-white mb-1">4.9/5</span>
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Designed for your <span className="text-emerald-500">well-being</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Our platform integrates everything you need for a modern healthcare experience.
              </p>
            </div>
            <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300">
              Explore all features <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Feature - Large */}
            <Card className="md:col-span-2 md:row-span-3 bg-card/50 border-none shadow-none overflow-hidden relative group">
              <div className="p-10 md:p-16 relative z-10 h-full flex flex-col">
                <div className="medical-glow p-4 rounded-xl w-fit mb-8 shadow-lg shadow-primary/20">
                  {features[2].icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{features[2].title}</h3>
                <p className="text-muted-foreground text-xl max-w-md mb-12">
                  {features[2].description}
                </p>
                <div className="relative flex-grow min-h-[400px] rounded-2xl overflow-hidden glass-card">
                  <Image
                    src="/banner2.png"
                    alt="Video Consultation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </div>
            </Card>

            {/* Secondary Features - 3 smaller cards using Tonal Layering (No-Line Rule) */}
            {features.filter((_, i) => i !== 2).slice(0, 3).map((feature, index) => (
              <div key={index} className="bg-card/30 hover:bg-card/50 p-8 rounded-2xl transition-all duration-300 group flex flex-col items-start justify-center border-l-2 border-transparent hover:border-primary/40">
                <div className="bg-muted p-4 rounded-xl w-fit mb-6 text-primary group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Stepper */}
      <section className="py-24 border-y border-emerald-900/10 technical-grid">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the medical attention you need in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-emerald-900/20 -z-10" />

            {[
              { title: "Find your Doctor", desc: "Browse through our verified specialists and choose the right one for your needs.", icon: <Users className="h-6 w-6" /> },
              { title: "Book a Slot", desc: "Select a convenient time from the doctor's available schedule.", icon: <Clock className="h-6 w-6" /> },
              { title: "Start Consultation", desc: "Join the secure video call and get professional medical advice immediately.", icon: <CheckCircle2 className="h-6 w-6" /> }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group bg-card/20 p-10 rounded-3xl transition-all hover:bg-card/40">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center text-primary mb-8 group-hover:medical-glow group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4">
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Package</h2>
          </div>

          <Pricing />

          <div className="max-w-3xl mx-auto mt-16">
            <Card className="bg-muted/30 border-emerald-900/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Stethoscope className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Our Credit System</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {creditBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-950 p-1 rounded-full">
                        <ArrowRight className="h-3 w-3 text-emerald-400" />
                      </div>
                      <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: benefit }} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4">Voice of our <span className="medical-glow-text">patients</span></h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Real stories from real patients. See why thousands trust DocMeet for their healthcare journey.
              </p>
            </div>
          </div>

          <ReviewCarousel reviews={reviews} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 technical-grid">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2rem] bg-card/30 border border-white/5 p-12 md:p-24 text-center overflow-hidden glass-card">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[120px] -z-10" />

            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to <span className="medical-glow-text">prioritize</span> your health?</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Join thousands of others who have switched to a smarter, faster, and more personal healthcare experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="xl" className="medical-glow text-primary-foreground hover:opacity-90 rounded-md h-16 px-12 text-lg shadow-2xl shadow-primary/20">
                <Link href="/onboarding">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-md h-16 px-12 text-lg border-primary/20 hover:bg-muted font-medium">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

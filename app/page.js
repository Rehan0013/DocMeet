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
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-emerald-500/10 blur-[120px] -z-10 rounded-full" />

        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="outline"
            className="bg-emerald-900/30 border-emerald-700/30 px-6 py-2 text-emerald-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000"
          >
            The Future of Healthcare is Here
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Connect with experts <br />
            <span className="text-emerald-500">whenever you need.</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Secure, professional medical consultations from the comfort of your home.
            Book top-rated doctors and manage your health journey in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              asChild
              size="xl"
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 h-14 text-lg rounded-full shadow-lg shadow-emerald-900/20"
            >
              <Link href="/onboarding">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-emerald-700/30 hover:bg-muted/80 px-8 h-14 text-lg rounded-full"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Feature - Large */}
            <Card className="md:col-span-2 md:row-span-3 bg-emerald-900/10 border-emerald-800/20 overflow-hidden relative group">
              <div className="p-6 md:p-10 relative z-10 h-full flex flex-col">
                <div className="bg-emerald-500 p-3 rounded-2xl w-fit mb-6 shadow-lg shadow-emerald-500/20">
                  {features[2].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{features[2].title}</h3>
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                  {features[2].description}
                </p>
                <div className="relative flex-grow min-h-[300px] rounded-xl overflow-hidden border border-emerald-800/30">
                  <Image
                    src="/banner2.png"
                    alt="Video Consultation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              </div>
            </Card>

            {/* Secondary Features - 3 smaller cards */}
            {features.filter((_, i) => i !== 2).slice(0, 3).map((feature, index) => (
              <Card key={index} className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all group flex flex-col justify-center">
                <CardHeader className="py-4 px-6 scale-95 origin-left">
                  <div className="bg-muted p-2 rounded-lg w-fit mb-2 group-hover:bg-emerald-900/30 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0 px-6 pb-4 scale-95 origin-left">
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Stepper */}
      <section className="py-24 border-y border-emerald-900/10">
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
              <div key={i} className="flex flex-col items-center text-center group border-2 border-emerald-900/40 rounded-lg p-4">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-emerald-900/40 flex items-center justify-center text-emerald-400 mb-6 group-hover:border-emerald-500 group-hover:bg-emerald-900/10 transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '24px 24px' }} />

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
      <section className="py-24 bg-[#0a0a0a] relative border-t border-emerald-900/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Voice of our patients</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Real stories from real patients. See why thousands trust DocMeet for their healthcare journey.
              </p>
            </div>
          </div>

          <ReviewCarousel reviews={reviews} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-emerald-950/40 border border-emerald-800/30 p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/10 blur-[100px] -z-10" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to prioritize your health?</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join thousands of others who have switched to a smarter, faster, and more personal healthcare experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" className="bg-emerald-600 hover:bg-emerald-700 rounded-full h-14 px-10">
                <Link href="/onboarding">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full h-14 px-10 border-emerald-700/50">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

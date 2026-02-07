"use client";

import { Timer, Zap, Trophy, Users, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Landing() {
  const features = [
    {
      icon: Timer,
      title: "Race the Clock",
      description:
        "Built-in timer with splits tracking. Every millisecond counts in your pursuit of the perfect run.",
    },
    {
      icon: Trophy,
      title: "Compete Globally",
      description:
        "Weekly and all-time leaderboards. Claim your spot among the fastest runners worldwide.",
    },
    {
      icon: Zap,
      title: "Quick Runs",
      description:
        "No signup walls. Jump into a run instantly and start grinding for that PB.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Share your runs, compare splits, and celebrate clean runs with fellow speedrunners.",
    },
  ];

  const stats = [
    { value: "12K+", label: "Runners" },
    { value: "847K", label: "Total Runs" },
    { value: "156", label: "Problems" },
    { value: "2:34", label: "World Record" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 relative overflow-hidden h-svh flex flex-col items-center justify-center">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(270 91% 45% / 0.25) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in stagger-1 opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              Code Fast.{" "}
              <span className="text-primary text-glow">Run Faster.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in stagger-2 opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              Race the clock through challenges, track your splits, and compete
              for the fastest runs on the global leaderboard.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3 opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <Link href="/register">
                <Button variant="hero" className="group">
                  <Play className="h-5 w-5" />
                  Start Your First Run
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="hero">
                  <Trophy className="h-5 w-5" />
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-20">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in opacity-0"
                style={{
                  animationDelay: `${0.4 + i * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-3xl md:text-4xl font-bold text-primary font-mono">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for the <span className="text-primary">grind</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to optimize your runs and climb the ranks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group bg-card border border-border rounded-xl p-6 card-hover animate-fade-in opacity-0"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom, hsl(270 91% 75% / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to chase your PB?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of runners pushing the limits of competitive
              programming.
            </p>
            <Link href="/problems">
              <Button variant="hero" className="group">
                Browse Problems
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

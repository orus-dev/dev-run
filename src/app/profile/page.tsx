"use client";

import { Trophy, Timer, Zap, Target, Calendar, Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ProfileStatCard from "@/app/profile/components/ProfileStatCard";
import Rank from "@/components/app/Rank";

export default function Profile() {
  const user = {
    username: "speedmaster_x",
    joinDate: "Jan 2024",
    rank: 1,
    totalRuns: 2341,
    pb: "2:34.21",
    cleanRuns: 892,
    avgTime: "3:12.45",
    favoriteCategory: "Any%",
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent" />

          <CardContent className="relative p-8 flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-bold text-primary-foreground glow-purple">
                {user.username[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8">
                <Rank rank={user.rank} />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-muted-foreground mb-3">
                Runner since {user.joinDate}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge>World Record Holder</Badge>
                <Badge variant="secondary">{user.favoriteCategory} Main</Badge>
              </div>
            </div>

            {/* PB */}
            <div className="text-right">
              <p className="text-4xl font-bold font-mono text-primary text-glow">
                {user.pb}
              </p>
              <p className="text-sm text-muted-foreground">Personal Best</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProfileStatCard
            label="Total Runs"
            value={user.totalRuns.toLocaleString()}
            icon={Zap}
            index={0}
          />
          <ProfileStatCard
            label="Clean Runs"
            value={user.cleanRuns.toString()}
            icon={Target}
            trend="+12 this week"
            index={1}
          />
          <ProfileStatCard
            label="Global Rank"
            value={`#${user.rank}`}
            icon={Trophy}
            index={2}
          />
          <ProfileStatCard
            label="Avg Time"
            value={user.avgTime}
            icon={Timer}
            index={3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Runs */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Runs</CardTitle>
              <Button variant="link" size="sm">
                View all
              </Button>
            </CardHeader>

            <CardContent className="space-y-3">
              {recentRuns.map((run, i) => (
                <div
                  key={run.id}
                  className="flex items-center justify-between rounded-lg px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition animate-fade-in opacity-0"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        run.status === "clean" ? "bg-emerald-400" : "bg-red-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{run.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {run.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-mono font-semibold ${
                        run.status === "reset"
                          ? "text-red-400"
                          : "text-foreground"
                      }`}
                    >
                      {run.time}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {run.status}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements + PB */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Achievements</CardTitle>
                <span className="text-sm text-muted-foreground">5 / 6</span>
              </CardHeader>

              <CardContent className="space-y-3">
                {achievements.map((a, i) => (
                  <div
                    key={a.name}
                    className={`flex items-center gap-3 rounded-lg p-3 animate-fade-in opacity-0 ${
                      a.unlocked
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-secondary/30 opacity-50"
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        a.unlocked
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <a.icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.description}
                      </p>
                    </div>

                    {a.unlocked && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-primary-foreground"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* PB History */}
            <Card>
              <CardHeader>
                <CardTitle>PB History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pbHistory.map((pb, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{pb.time}</span>
                      <span className="text-muted-foreground">{pb.date}</span>
                    </div>
                    {i !== pbHistory.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- data ---------------- */

const recentRuns = [
  {
    id: 1,
    category: "Any%",
    time: "2:38.54",
    date: "2 hours ago",
    status: "clean",
  },
  {
    id: 2,
    category: "Any%",
    time: "2:45.12",
    date: "3 hours ago",
    status: "clean",
  },
  {
    id: 3,
    category: "Easy Only",
    time: "1:23.45",
    date: "5 hours ago",
    status: "clean",
  },
  {
    id: 4,
    category: "Any%",
    time: "--:--",
    date: "5 hours ago",
    status: "reset",
  },
  {
    id: 5,
    category: "Any%",
    time: "2:51.33",
    date: "Yesterday",
    status: "clean",
  },
  {
    id: 6,
    category: "No DP",
    time: "3:45.67",
    date: "Yesterday",
    status: "clean",
  },
];

const achievements = [
  {
    name: "First Blood",
    description: "Complete your first run",
    icon: Zap,
    unlocked: true,
  },
  {
    name: "Sub-3 Club",
    description: "Finish a run under 3 minutes",
    icon: Timer,
    unlocked: true,
  },
  {
    name: "World Record",
    description: "Hold a world record",
    icon: Trophy,
    unlocked: true,
  },
  {
    name: "Century",
    description: "Complete 100 runs",
    icon: Target,
    unlocked: true,
  },
  {
    name: "Perfectionist",
    description: "100 clean runs",
    icon: Award,
    unlocked: false,
  },
  {
    name: "Marathon",
    description: "10 hours of running",
    icon: Calendar,
    unlocked: true,
  },
];

const pbHistory = [
  { time: "2:34.21", date: "Today" },
  { time: "2:38.54", date: "3 days ago" },
  { time: "2:45.12", date: "1 week ago" },
  { time: "2:52.33", date: "2 weeks ago" },
];

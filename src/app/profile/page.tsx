import { Trophy, Timer, Zap, Target, Calendar, TrendingUp, Award } from "lucide-react";
import StatCard from "@/components/app/StatCard";

const Profile = () => {
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

    const recentRuns = [
        { id: 1, category: "Any%", time: "2:38.54", date: "2 hours ago", status: "clean" },
        { id: 2, category: "Any%", time: "2:45.12", date: "3 hours ago", status: "clean" },
        { id: 3, category: "Easy Only", time: "1:23.45", date: "5 hours ago", status: "clean" },
        { id: 4, category: "Any%", time: "--:--", date: "5 hours ago", status: "reset" },
        { id: 5, category: "Any%", time: "2:51.33", date: "Yesterday", status: "clean" },
        { id: 6, category: "No DP", time: "3:45.67", date: "Yesterday", status: "clean" },
    ];

    const achievements = [
        { name: "First Blood", description: "Complete your first run", icon: Zap, unlocked: true },
        { name: "Sub-3 Club", description: "Finish a run under 3 minutes", icon: Timer, unlocked: true },
        { name: "World Record", description: "Hold a world record", icon: Trophy, unlocked: true },
        { name: "Century", description: "Complete 100 runs", icon: Target, unlocked: true },
        { name: "Perfectionist", description: "100 clean runs", icon: Award, unlocked: false },
        { name: "Marathon", description: "10 hours of running", icon: Calendar, unlocked: true },
    ];

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6">
                {/* Profile Header */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-8 relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-3xl font-bold text-primary-foreground glow-purple">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg rank-gold flex items-center justify-center text-sm font-bold glow-gold">
                                #1
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-foreground mb-1">{user.username}</h1>
                            <p className="text-muted-foreground mb-3">Runner since {user.joinDate}</p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/30">
                                    World Record Holder
                                </span>
                                <span className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-sm">
                                    {user.favoriteCategory} Main
                                </span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="text-right">
                            <p className="text-4xl font-bold font-mono text-primary text-glow">{user.pb}</p>
                            <p className="text-sm text-muted-foreground">Personal Best</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Runs" value={user.totalRuns.toLocaleString()} icon={Zap} index={0} />
                    <StatCard label="Clean Runs" value={user.cleanRuns.toString()} icon={Target} trend="+12 this week" index={1} />
                    <StatCard label="Global Rank" value={`#${user.rank}`} icon={Trophy} index={2} />
                    <StatCard label="Avg Time" value={user.avgTime} icon={Timer} index={3} />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Runs */}
                    <div className="lg:col-span-2">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-foreground">Recent Runs</h2>
                                <button className="text-sm text-primary hover:underline">View All</button>
                            </div>

                            <div className="space-y-3">
                                {recentRuns.map((run, i) => (
                                    <div
                                        key={run.id}
                                        className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in opacity-0"
                                        style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${run.status === 'clean' ? 'bg-emerald-400' : 'bg-red-400'
                                                }`} />
                                            <div>
                                                <p className="font-medium text-foreground">{run.category}</p>
                                                <p className="text-xs text-muted-foreground">{run.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-mono font-semibold ${run.status === 'reset' ? 'text-red-400' : 'text-foreground'
                                                }`}>
                                                {run.time}
                                            </p>
                                            <p className="text-xs text-muted-foreground capitalize">{run.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-foreground">Achievements</h2>
                                <span className="text-sm text-muted-foreground">5/6</span>
                            </div>

                            <div className="space-y-3">
                                {achievements.map((achievement, i) => (
                                    <div
                                        key={achievement.name}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all animate-fade-in opacity-0 ${achievement.unlocked
                                                ? 'bg-primary/10 border border-primary/20'
                                                : 'bg-secondary/30 opacity-50'
                                            }`}
                                        style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
                                    >
                                        <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                                            }`}>
                                            <achievement.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                                                }`}>
                                                {achievement.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                        </div>
                                        {achievement.unlocked && (
                                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PB History */}
                        <div className="bg-card border border-border rounded-xl p-6 mt-4">
                            <h2 className="text-xl font-bold text-foreground mb-4">PB History</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground text-sm">2:34.21</span>
                                    <span className="text-xs text-muted-foreground">Today</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground text-sm">2:38.54</span>
                                    <span className="text-xs text-muted-foreground">3 days ago</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground text-sm">2:45.12</span>
                                    <span className="text-xs text-muted-foreground">1 week ago</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-muted-foreground text-sm">2:52.33</span>
                                    <span className="text-xs text-muted-foreground">2 weeks ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

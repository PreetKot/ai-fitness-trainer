"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { TrendingUpIcon, CalendarIcon, TargetIcon, AwardIcon } from "lucide-react";

interface ProgressData {
  date: string;
  weight: number;
  workoutsCompleted: number;
  caloriesBurned: number;
}

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([
    { date: "2025-01-20", weight: 75, workoutsCompleted: 5, caloriesBurned: 2100 },
    { date: "2025-01-21", weight: 74.8, workoutsCompleted: 6, caloriesBurned: 2350 },
    { date: "2025-01-22", weight: 74.5, workoutsCompleted: 4, caloriesBurned: 1800 },
    { date: "2025-01-23", weight: 74.3, workoutsCompleted: 7, caloriesBurned: 2500 },
  ]);

  const [newWeight, setNewWeight] = useState("");
  const [newWorkouts, setNewWorkouts] = useState("");
  const [newCalories, setNewCalories] = useState("");

  const handleAddProgress = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const newEntry: ProgressData = {
      date: today,
      weight: parseFloat(newWeight),
      workoutsCompleted: parseInt(newWorkouts),
      caloriesBurned: parseInt(newCalories),
    };
    
    setProgressData([...progressData, newEntry]);
    setNewWeight("");
    setNewWorkouts("");
    setNewCalories("");
  };

  const latestData = progressData[progressData.length - 1];
  const previousData = progressData[progressData.length - 2];
  const weightChange = latestData && previousData ? latestData.weight - previousData.weight : 0;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4 font-mono">Progress Tracker</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
        <p className="text-white/70 mt-3 font-mono">Monitor your fitness journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Stats */}
        <Card className="bg-black/60 border-primary/30 p-6">
          <div className="text-center">
            <TrendingUpIcon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary font-mono mb-1">
              {latestData?.weight || 0} kg
            </div>
            <div className="text-sm text-white/70 font-mono">Current Weight</div>
            {weightChange !== 0 && (
              <div className={`text-xs font-mono mt-2 px-2 py-1 rounded-full ${
                weightChange < 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
              </div>
            )}
          </div>
        </Card>

        <Card className="bg-black/60 border-primary/30 p-6">
          <div className="text-center">
            <TargetIcon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary font-mono mb-1">
              {latestData?.workoutsCompleted || 0}
            </div>
            <div className="text-sm text-white/70 font-mono">Workouts This Week</div>
            <div className="mt-2 h-2 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-yellow-400 transition-all duration-500"
                style={{ width: `${Math.min(((latestData?.workoutsCompleted || 0) / 7) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 border-primary/30 p-6">
          <div className="text-center">
            <AwardIcon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary font-mono mb-1">
              {latestData?.caloriesBurned || 0}
            </div>
            <div className="text-sm text-white/70 font-mono">Calories Burned Today</div>
            <div className="text-xs text-green-400 font-mono mt-2">
              Target: 2000 kcal
            </div>
          </div>
        </Card>
      </div>

      {/* Add New Progress */}
      <div className="bg-black/60 border border-primary/30 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-4 font-mono flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Log Today&apos;s Progress
        </h3>
        
        <form onSubmit={handleAddProgress} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono text-yellow-400 mb-2">WEIGHT (KG)</label>
            <input
              className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="75.5"
              value={newWeight}
              onChange={e => setNewWeight(e.target.value)}
              required
              type="number"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-yellow-400 mb-2">WORKOUTS</label>
            <input
              className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="5"
              value={newWorkouts}
              onChange={e => setNewWorkouts(e.target.value)}
              required
              type="number"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-yellow-400 mb-2">CALORIES BURNED</label>
            <input
              className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="2100"
              value={newCalories}
              onChange={e => setNewCalories(e.target.value)}
              required
              type="number"
            />
          </div>
          <Button 
            type="submit"
            className="self-end bg-gradient-to-r from-primary to-yellow-400 text-black font-mono font-bold px-6 py-3 hover:shadow-lg transition-all"
          >
            Log Progress
          </Button>
        </form>
      </div>

      {/* Progress History */}
      <div className="bg-black/60 border border-primary/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4 font-mono">Recent Progress</h3>
        <div className="space-y-3">
          {progressData.slice(-5).reverse().map((data) => (
            <div key={data.date} className="flex items-center justify-between bg-black/40 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="text-sm font-mono text-yellow-400">
                  {new Date(data.date).toLocaleDateString()}
                </div>
                <div className="text-sm font-mono text-white">
                  Weight: <span className="text-primary">{data.weight} kg</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-mono">
                <span className="text-white/70">
                  Workouts: <span className="text-secondary">{data.workoutsCompleted}</span>
                </span>
                <span className="text-white/70">
                  Burned: <span className="text-yellow-400">{data.caloriesBurned} kcal</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;

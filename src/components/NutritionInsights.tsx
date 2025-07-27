"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUpIcon, 
  DropletIcon, 
  ZapIcon, 
  ShieldIcon,
  InfoIcon
} from "lucide-react";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  water: number; // in liters
}

const NutritionInsights = () => {
  const [currentNutrition, setCurrentNutrition] = useState<NutritionData>({
    calories: 1850,
    protein: 125,
    carbs: 180,
    fats: 65,
    fiber: 25,
    water: 2.1
  });

  // Toast notification state
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const logWater = () => {
    setCurrentNutrition(prev => ({
      ...prev,
      water: Math.min(prev.water + 0.25, targetNutrition.water * 1.5)
    }));
    showToast("💧 Water logged! +250ml added to your daily hydration goal.", "success");
  };

  const logSnack = () => {
    const snackCalories = Math.floor(Math.random() * 200) + 100;
    setCurrentNutrition(prev => ({
      ...prev,
      calories: prev.calories + snackCalories
    }));
    showToast(`🍎 Healthy snack logged! +${snackCalories} calories`, "success");
  };

  const logMeal = () => {
    const mealCalories = Math.floor(Math.random() * 400) + 300;
    setCurrentNutrition(prev => ({
      ...prev,
      calories: prev.calories + mealCalories
    }));
    showToast(`🍽️ Meal logged! +${mealCalories} calories`, "success");
  };

  const logSupplement = () => {
    showToast("💊 Supplement logged! Remember: Consistency is key.", "info");
  };

  const [targetNutrition] = useState<NutritionData>({
    calories: 2200,
    protein: 150,
    carbs: 220,
    fats: 75,
    fiber: 30,
    water: 3.0
  });

  const calculatePercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const macronutrients = [
    {
      name: "Protein",
      current: currentNutrition.protein,
      target: targetNutrition.protein,
      unit: "g",
      color: "from-blue-500 to-blue-400",
      icon: "💪",
      description: "Building blocks for muscle repair and growth"
    },
    {
      name: "Carbs",
      current: currentNutrition.carbs,
      target: targetNutrition.carbs,
      unit: "g",
      color: "from-green-500 to-green-400",
      icon: "⚡",
      description: "Primary energy source for workouts"
    },
    {
      name: "Fats",
      current: currentNutrition.fats,
      target: targetNutrition.fats,
      unit: "g",
      color: "from-yellow-500 to-yellow-400",
      icon: "🥑",
      description: "Essential for hormone production"
    }
  ];

  const dailyTips = [
    "💡 Aim to eat protein within 30 minutes post-workout for optimal recovery",
    "🥤 Start your day with a glass of water to kickstart your metabolism",
    "🌿 Include leafy greens in every meal for micronutrient density",
    "🍎 Choose whole fruits over fruit juices to get beneficial fiber",
    "🥜 Add healthy fats like nuts and seeds for sustained energy"
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4 font-mono">Nutrition Insights</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
        <p className="text-white/70 mt-3 font-mono">Track your daily nutrition goals</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/60 border border-primary/30">
          <TabsTrigger value="overview" className="font-mono">Overview</TabsTrigger>
          <TabsTrigger value="macros" className="font-mono">Macros</TabsTrigger>
          <TabsTrigger value="tips" className="font-mono">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-black/60 border-primary/30 p-6">
              <div className="flex items-center justify-between mb-3">
                <ZapIcon className="w-6 h-6 text-yellow-400" />
                <span className="text-xs font-mono text-yellow-400">CALORIES</span>
              </div>
              <div className="text-2xl font-bold text-primary font-mono mb-1">
                {currentNutrition.calories}
              </div>
              <div className="text-xs text-white/70 font-mono">
                of {targetNutrition.calories} kcal
              </div>
              <div className="mt-3 h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-yellow-400 transition-all duration-500"
                  style={{ width: `${calculatePercentage(currentNutrition.calories, targetNutrition.calories)}%` }}
                ></div>
              </div>
            </Card>

            <Card className="bg-black/60 border-primary/30 p-6">
              <div className="flex items-center justify-between mb-3">
                <DropletIcon className="w-6 h-6 text-blue-400" />
                <span className="text-xs font-mono text-blue-400">HYDRATION</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 font-mono mb-1">
                {currentNutrition.water}L
              </div>
              <div className="text-xs text-white/70 font-mono">
                of {targetNutrition.water}L target
              </div>
              <div className="mt-3 h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                  style={{ width: `${calculatePercentage(currentNutrition.water, targetNutrition.water)}%` }}
                ></div>
              </div>
            </Card>

            <Card className="bg-black/60 border-primary/30 p-6">
              <div className="flex items-center justify-between mb-3">
                <ShieldIcon className="w-6 h-6 text-green-400" />
                <span className="text-xs font-mono text-green-400">FIBER</span>
              </div>
              <div className="text-2xl font-bold text-green-400 font-mono mb-1">
                {currentNutrition.fiber}g
              </div>
              <div className="text-xs text-white/70 font-mono">
                of {targetNutrition.fiber}g target
              </div>
              <div className="mt-3 h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                  style={{ width: `${calculatePercentage(currentNutrition.fiber, targetNutrition.fiber)}%` }}
                ></div>
              </div>
            </Card>

            <Card className="bg-black/60 border-primary/30 p-6">
              <div className="flex items-center justify-between mb-3">
                <TrendingUpIcon className="w-6 h-6 text-purple-400" />
                <span className="text-xs font-mono text-purple-400">PROGRESS</span>
              </div>
              <div className="text-2xl font-bold text-purple-400 font-mono mb-1">
                84%
              </div>
              <div className="text-xs text-white/70 font-mono">
                Daily goals met
              </div>
              <div className="mt-3 h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                  style={{ width: "84%" }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-black/60 border-primary/30 p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 font-mono">Quick Log</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10 font-mono text-sm"
                onClick={logWater}
              >
                🥤 Water
              </Button>
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10 font-mono text-sm"
                onClick={logSnack}
              >
                🍎 Snack
              </Button>
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10 font-mono text-sm"
                onClick={logMeal}
              >
                🍽️ Meal
              </Button>
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10 font-mono text-sm"
                onClick={logSupplement}
              >
                💊 Supplement
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="macros" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {macronutrients.map((macro, idx) => (
              <Card key={idx} className="bg-black/60 border-primary/30 p-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">{macro.icon}</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2 font-mono">{macro.name}</h3>
                  <div className="text-3xl font-bold text-primary font-mono mb-2">
                    {macro.current}
                    <span className="text-lg text-white/70">/{macro.target}{macro.unit}</span>
                  </div>
                  
                  {/* Progress Circle */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={idx === 0 ? "#3b82f6" : idx === 1 ? "#10b981" : "#f59e0b"}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="251"
                        strokeDashoffset={251 - (calculatePercentage(macro.current, macro.target) / 100) * 251}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold font-mono ${getStatusColor(calculatePercentage(macro.current, macro.target))}`}>
                        {Math.round(calculatePercentage(macro.current, macro.target))}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-white/70 font-mono">{macro.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card className="bg-black/60 border-primary/30 p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-6 font-mono flex items-center gap-2">
              <InfoIcon className="w-5 h-5" />
              Daily Nutrition Tips
            </h3>
            <div className="space-y-4">
              {dailyTips.map((tip, idx) => (
                <div key={idx} className="bg-black/40 rounded-lg p-4 border border-primary/20">
                  <p className="text-white/90 font-mono text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-yellow-400/10 border-primary/50 p-6">
            <h4 className="text-lg font-bold text-primary mb-3 font-mono">💡 Pro Tip</h4>
            <p className="text-white/90 font-mono text-sm">
              The timing of your meals can be just as important as what you eat. Try to have your largest carb portion around your workout for optimal energy and recovery.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 font-mono text-sm shadow-lg animate-fade-in ${
          toast.type === 'success' ? 'bg-green-900/90 border border-green-500/50 text-green-200' :
          'bg-blue-900/90 border border-blue-500/50 text-blue-200'
        }`}>
          {toast.message}
        </div>
      )}
    </section>
  );
};

export default NutritionInsights;

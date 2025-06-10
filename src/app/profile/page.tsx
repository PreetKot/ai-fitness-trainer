"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoFitnessPlan from "@/components/NoFitnessPlan";
import CornerElements from "@/components/CornerElements";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppleIcon, CalendarIcon, DumbbellIcon, DownloadIcon, SparklesIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MOTIVATION_QUOTES = [
  "Every rep brings you closer to your goal.",
  "Discipline is the bridge between goals and accomplishment.",
  "You are stronger than you think.",
  "Consistency beats intensity.",
  "Fuel your ambition with action.",
  "Sweat, smile, repeat.",
  "Your only limit is you.",
  "Progress, not perfection.",
];

function getRandomQuote() {
  return MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
}

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);
  const [quote, setQuote] = useState<string | null>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  // Example: Download plan as JSON
  const handleDownloadPlan = () => {
    if (!currentPlan) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentPlan, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${currentPlan.name}_plan.json`);
    dlAnchorElem.click();
  };

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4 bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] min-h-screen">
      <ProfileHeader user={user} />

      {/* Animated background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {allPlans && allPlans?.length > 0 ? (
        <div className="space-y-10">
          {/* PLAN SELECTOR */}
          <div className="relative backdrop-blur-md border border-primary/40 rounded-xl p-6 shadow-xl bg-black/40">
            <CornerElements />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                <span className="text-primary">Your</span>{" "}
                <span className="text-foreground">Fitness Plans</span>
              </h2>
              <div className="font-mono text-xs text-yellow-400">
                TOTAL: {allPlans.length}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {allPlans.map((plan) => (
                <Button
                  key={plan._id}
                  onClick={() => setSelectedPlanId(plan._id)}
                  className={`text-foreground border font-mono hover:text-white ${
                    selectedPlanId === plan._id
                      ? "bg-gradient-to-r from-primary/30 to-yellow-400/20 text-primary border-primary shadow-lg"
                      : "bg-black/30 border-border hover:border-primary/50"
                  }`}
                >
                  {plan.name}
                  {plan.isActive && (
                    <span className="ml-2 bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* MOTIVATION QUOTE */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-300 font-mono font-bold shadow hover:bg-yellow-400/10"
              onClick={() => setQuote(getRandomQuote())}
            >
              <SparklesIcon className="mr-2 text-yellow-400" size={18} />
              Get Motivated
            </Button>
            {quote && (
              <div className="bg-black/60 border-l-4 border-yellow-400 rounded-lg px-6 py-4 shadow-lg font-mono text-yellow-200 animate-fade-in">
                <SparklesIcon className="inline mr-2 text-yellow-400" size={18} />
                {quote}
              </div>
            )}
          </div>

          {/* PLAN DETAILS */}
          {currentPlan && (
            <div className="relative backdrop-blur-md border border-primary/40 rounded-2xl p-8 shadow-2xl bg-black/50">
              <CornerElements />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold font-mono">
                  PLAN: <span className="text-primary">{currentPlan.name}</span>
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto flex items-center gap-1 text-yellow-400 border border-yellow-400 hover:bg-yellow-400/10"
                  onClick={handleDownloadPlan}
                >
                  <DownloadIcon size={16} />
                  Download Plan
                </Button>
              </div>

              <Tabs defaultValue="workout" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-2 bg-gradient-to-r from-primary/20 via-background/80 to-secondary/20 border border-primary/30 rounded-lg">
                  <TabsTrigger
                    value="workout"
                    className="data-[state=active]:bg-primary/30 data-[state=active]:text-primary font-mono"
                  >
                    <DumbbellIcon className="mr-2 size-4" />
                    Workout Plan
                  </TabsTrigger>

                  <TabsTrigger
                    value="diet"
                    className="data-[state=active]:bg-primary/30 data-[state=active]:text-primary font-mono"
                  >
                    <AppleIcon className="mr-2 h-4 w-4" />
                    Diet Plan
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="workout">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">
                        SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
                      </span>
                    </div>

                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                        <AccordionItem
                          key={index}
                          value={exerciseDay.day}
                          className="border rounded-lg overflow-hidden bg-gradient-to-r from-primary/10 to-background/60"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/10 font-mono">
                            <div className="flex justify-between w-full items-center">
                              <span className="text-primary">{exerciseDay.day}</span>
                              <div className="text-xs text-muted-foreground">
                                {exerciseDay.routines.length} EXERCISES
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-4 px-4">
                            <div className="space-y-3 mt-2">
                              {exerciseDay.routines.map((routine, routineIndex) => (
                                <div
                                  key={routineIndex}
                                  className="border border-border rounded p-3 bg-background/50"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-foreground">
                                      {routine.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                                        {routine.sets} SETS
                                      </div>
                                      <div className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
                                        {routine.reps} REPS
                                      </div>
                                    </div>
                                  </div>
                                  {routine.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {routine.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="diet">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        DAILY CALORIE TARGET
                      </span>
                      <div className="font-mono text-xl text-primary">
                        {currentPlan.dietPlan.dailyCalories} KCAL
                      </div>
                    </div>

                    <div className="h-px w-full bg-border my-4"></div>

                    <div className="space-y-4">
                      {currentPlan.dietPlan.meals.map((meal, index) => (
                        <div
                          key={index}
                          className="border border-border rounded-lg overflow-hidden p-4 bg-gradient-to-r from-yellow-400/10 to-background/60"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <h4 className="font-mono text-primary">{meal.name}</h4>
                          </div>
                          <ul className="space-y-2">
                            {meal.foods.map((food, foodIndex) => (
                              <li
                                key={foodIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-xs text-primary font-mono">
                                  {String(foodIndex + 1).padStart(2, "0")}
                                </span>
                                {food}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      ) : (
        <NoFitnessPlan />
      )}
    </section>
  );
};
export default ProfilePage;
"use client";

import { useState, useRef } from "react";
import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon, SparklesIcon, MessageCircleIcon, XIcon, SendIcon } from "lucide-react";
import Link from "next/link";

const MOTIVATION_QUOTES = [
  "Push yourself, because no one else is going to do it for you.",
  "Success starts with self-discipline.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don’t limit your challenges. Challenge your limits.",
  "Train insane or remain the same.",
  "Your body can stand almost anything. It’s your mind you have to convince.",
  "Sweat is just fat crying.",
  "Great things never come from comfort zones.",
];

const SAMPLE_PLANS = [
  {
    name: "Beginner Full Body",
    description: "A simple plan to get you started with strength training.",
    days: ["Monday", "Wednesday", "Friday"],
    focus: "Full Body",
    calories: 2200,
  },
  {
    name: "Lean & Strong",
    description: "Build muscle and burn fat with this intermediate split.",
    days: ["Monday", "Tuesday", "Thursday", "Friday"],
    focus: "Upper/Lower Split",
    calories: 2500,
  },
  {
    name: "Athlete Pro",
    description: "Advanced program for performance and aesthetics.",
    days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    focus: "Push/Pull/Legs",
    calories: 2800,
  },
];

const SAMPLE_DIETS = [
  {
    name: "Weight Loss",
    calories: 1800,
    meals: [
      { name: "Breakfast", foods: ["Oatmeal", "Banana", "Egg Whites"] },
      { name: "Lunch", foods: ["Grilled Chicken Salad", "Brown Rice"] },
      { name: "Snack", foods: ["Greek Yogurt", "Almonds"] },
      { name: "Dinner", foods: ["Baked Salmon", "Steamed Broccoli", "Quinoa"] },
    ],
  },
  {
    name: "Muscle Gain",
    calories: 2800,
    meals: [
      { name: "Breakfast", foods: ["Whole Eggs", "Toast", "Avocado"] },
      { name: "Lunch", foods: ["Turkey Sandwich", "Sweet Potato"] },
      { name: "Snack", foods: ["Protein Shake", "Peanut Butter"] },
      { name: "Dinner", foods: ["Steak", "Brown Rice", "Green Beans"] },
    ],
  },
  {
    name: "Balanced",
    calories: 2200,
    meals: [
      { name: "Breakfast", foods: ["Greek Yogurt", "Berries", "Granola"] },
      { name: "Lunch", foods: ["Grilled Fish", "Quinoa", "Spinach"] },
      { name: "Snack", foods: ["Apple", "Walnuts"] },
      { name: "Dinner", foods: ["Chicken Stir Fry", "Mixed Veggies"] },
    ],
  },
];

function getRandomQuote() {
  return MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
}

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

const HomePage = () => {
  const [quote, setQuote] = useState<string | null>(null);

  // BMI Calculator State
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const handleBmiCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const heightM = Number(bmiHeight) / 100;
    const weightKg = Number(bmiWeight);
    if (!heightM || !weightKg) return;
    const bmiValue = weightKg / (heightM * heightM);
    setBmi(Number(bmiValue.toFixed(1)));
  };

  // Calorie Calculator State
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState<{ food: string; calories: number }[]>([]);
  const foodInputRef = useRef<HTMLInputElement>(null);

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim() || !calories.trim() || isNaN(Number(calories))) return;
    setEntries([...entries, { food, calories: Number(calories) }]);
    setFood("");
    setCalories("");
    foodInputRef.current?.focus();
  };

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", content: "Hi! I'm your AI fitness assistant. How can I help you today?" },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Simulate AI reply (replace with real API if needed)
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [...msgs, { role: "user", content: chatInput }]);
    setChatLoading(true);
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        {
          role: "bot",
          content: "That's a great question! I'll help you with that. (This is a sample reply.)",
        },
      ]);
      setChatLoading(false);
    }, 1200);
    setChatInput("");
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <section className="relative z-10 py-24 flex-grow">
        {/* Animated background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* CORNER DECORATION */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2 border-primary/30" />

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                <div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-secondary animate-text-glow">
                    Transform
                  </span>
                </div>
                <div>
                  <span className="text-primary animate-pulse">Your Body</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">With Advanced</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-primary"> Technology</span>
                </div>
              </h1>

              {/* SEPARATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-60"></div>

              <p className="text-xl text-white/80 w-2/3 font-mono">
                Talk to our AI assistant and get personalized diet plans and workout routines
                designed just for you.
              </p>

              {/* MOTIVATION QUOTE */}
              {quote && (
                <div className="bg-black/60 border-l-4 border-yellow-400 rounded-lg px-6 py-4 my-2 shadow-lg font-mono text-yellow-200 animate-fade-in">
                  <SparklesIcon className="inline mr-2 text-yellow-400" size={18} />
                  {quote}
                </div>
              )}

              {/* STATS */}
              <div className="flex items-center gap-10 py-6 font-mono">
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-primary font-bold">500+</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">ACTIVE USERS</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-primary font-bold">3min</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">GENERATION</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-primary font-bold">100%</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">PERSONALIZED</div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-gradient-to-r from-primary via-yellow-400 to-secondary text-black px-8 py-6 text-lg font-mono font-bold shadow-lg animate-pulse"
                >
                  <Link href={"/generate-program"} className="flex items-center">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-yellow-400 text-yellow-300 font-mono font-bold shadow hover:bg-yellow-400/10"
                  onClick={() => setQuote(getRandomQuote())}
                >
                  <SparklesIcon className="mr-2 text-yellow-400" size={18} />
                  Get Motivated
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* CORNER PIECES */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
              </div>

              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-black/80 shadow-2xl border-2 border-primary/30">
                  <img
                    src="/hero-ai.png"
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center opacity-90"
                  />

                  {/* SCAN LINE */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary,_#ffe066)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                  {/* DECORATIONS ON TOP THE IMAGE */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />
                    {/* Targeting lines */}
                    <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                {/* TERMINAL OVERLAY */}
                <TerminalOverlay />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BMI CALCULATOR SECTION */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6 font-mono">BMI Calculator</h2>
        <form
          className="flex flex-col sm:flex-row gap-4 mb-4"
          onSubmit={handleBmiCalculate}
        >
          <input
            className="w-40 rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Height (cm)"
            value={bmiHeight}
            onChange={e => setBmiHeight(e.target.value.replace(/[^0-9.]/g, ""))}
            required
            inputMode="decimal"
          />
          <input
            className="w-40 rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Weight (kg)"
            value={bmiWeight}
            onChange={e => setBmiWeight(e.target.value.replace(/[^0-9.]/g, ""))}
            required
            inputMode="decimal"
          />
          <Button type="submit" className="rounded-lg">
            Calculate
          </Button>
        </form>
        {bmi !== null && (
          <div className="bg-black/60 border border-primary/30 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-center gap-4">
            <span className="font-mono text-lg text-yellow-400">
              Your BMI: <span className="text-primary">{bmi}</span>
            </span>
            <span className="font-mono text-lg text-primary">
              {bmiCategory(bmi)}
            </span>
          </div>
        )}
      </section>

      {/* CALORIE CALCULATOR SECTION */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6 font-mono">Calorie Calculator</h2>
        <form
          className="flex flex-col sm:flex-row gap-4 mb-4"
          onSubmit={handleAddEntry}
        >
          <input
            ref={foodInputRef}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Food (e.g. Chicken Breast)"
            value={food}
            onChange={e => setFood(e.target.value)}
            required
          />
          <input
            className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Calories"
            value={calories}
            onChange={e => setCalories(e.target.value.replace(/[^0-9]/g, ""))}
            required
            inputMode="numeric"
          />
          <Button type="submit" className="rounded-lg">
            Add
          </Button>
        </form>
        <div className="bg-black/60 border border-primary/30 rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-lg text-yellow-400">Total Calories:</span>
            <span className="font-mono text-2xl text-primary">{totalCalories} kcal</span>
          </div>
          <table className="w-full text-left font-mono mt-2">
            <thead>
              <tr>
                <th className="pb-2 text-yellow-400">Food</th>
                <th className="pb-2 text-yellow-400">Calories</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2">{entry.food}</td>
                  <td className="py-2">{entry.calories}</td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-2 text-muted-foreground text-center">
                    No entries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SAMPLE DIET PLANS SECTION */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6 font-mono">Sample Diet Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_DIETS.map((diet, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-black/60 border border-primary/30 shadow-lg p-6 flex flex-col gap-3 hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold text-yellow-400">{diet.name}</h3>
              <div className="flex flex-wrap gap-2 text-xs font-mono mb-2">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                  {diet.calories} kcal
                </span>
                <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                  {diet.meals.length} meals/day
                </span>
              </div>
              <div className="space-y-2">
                {diet.meals.map((meal, i) => (
                  <div key={i}>
                    <span className="font-bold text-primary">{meal.name}:</span>{" "}
                    <span className="text-white/80">{meal.foods.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE FITNESS PLANS */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6 font-mono">Sample Fitness Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-black/60 border border-primary/30 shadow-lg p-6 flex flex-col gap-3 hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold text-yellow-400">{plan.name}</h3>
              <p className="text-white/80">{plan.description}</p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                  {plan.focus}
                </span>
                <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                  {plan.days.length} days/week
                </span>
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">
                  {plan.calories} kcal
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Days: {plan.days.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </section>

      <UserPrograms />

      {/* CHATBOT FLOATING BUTTON & MODAL */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-yellow-400 transition-colors"
        onClick={() => setChatOpen(true)}
        aria-label="Open chatbot"
      >
        <MessageCircleIcon size={28} />
      </button>
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md mx-auto p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageCircleIcon className="text-primary" />
                <span className="font-bold text-primary">CBUM AI Chatbot</span>
              </div>
              <button
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setChatOpen(false)}
                aria-label="Close chatbot"
              >
                <XIcon size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto max-h-72 mb-2 space-y-2 px-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-3 py-2 ${
                    msg.role === "bot"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {chatLoading && (
                <div className="rounded-lg px-3 py-2 bg-primary/10 text-primary animate-pulse">
                  Typing...
                </div>
              )}
            </div>
            <form
              className="flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                handleChatSend();
              }}
            >
              <input
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Type your message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                disabled={chatLoading}
              />
              <Button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="rounded-lg"
                size="icon"
              >
                <SendIcon size={18} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
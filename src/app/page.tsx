"use client";

import { useState, useRef } from "react";
import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import ProgressTracker from "@/components/ProgressTracker";
import WorkoutTimer from "@/components/WorkoutTimer";
import NutritionInsights from "@/components/NutritionInsights";
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
    
    // Validation checks
    if (!heightM || !weightKg) {
      showToast("Please enter both height and weight values!", "error");
      return;
    }
    if (heightM < 0.5 || heightM > 3.0) {
      showToast("Please enter a valid height between 50cm and 300cm!", "error");
      return;
    }
    if (weightKg < 20 || weightKg > 500) {
      showToast("Please enter a valid weight between 20kg and 500kg!", "error");
      return;
    }
    
    const bmiValue = weightKg / (heightM * heightM);
    setBmi(Number(bmiValue.toFixed(1)));
    
    const category = bmiCategory(bmiValue);
    showToast(`BMI calculated: ${bmiValue.toFixed(1)} (${category})`, "success");
  };

  // Calorie Calculator State
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState<{ food: string; calories: number }[]>([]);
  const foodInputRef = useRef<HTMLInputElement>(null);

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim() || !calories.trim() || isNaN(Number(calories))) {
      showToast("Please enter valid food and calorie values!", "error");
      return;
    }
    const newEntry = { food, calories: Number(calories) };
    setEntries([...entries, newEntry]);
    setFood("");
    setCalories("");
    foodInputRef.current?.focus();
    
    showToast(`Added ${food} (${calories} kcal) to your daily intake!`, "success");
  };

  const removeEntry = (indexToRemove: number) => {
    const removedEntry = entries[indexToRemove];
    setEntries(entries.filter((_, index) => index !== indexToRemove));
    showToast(`Removed ${removedEntry.food} from your intake`, "info");
  };

  const clearEntries = () => {
    if (entries.length === 0) return;
    if (confirm("🗑️ Are you sure you want to clear all calorie entries?")) {
      setEntries([]);
      showToast("All calorie entries cleared!", "info");
    }
  };

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", content: "Hi! I&apos;m your AI fitness assistant. How can I help you today?" },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Simulate AI reply (replace with real API if needed)
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [...msgs, { role: "user", content: chatInput }]);
    setChatLoading(true);
    
    // Generate contextual AI responses based on input
    const generateAIResponse = (userInput: string) => {
      const input = userInput.toLowerCase();
      
      if (input.includes("workout") || input.includes("exercise")) {
        return "💪 I can help you with workouts! Try our workout timer above, or I can suggest exercises based on your fitness level. What type of workout are you interested in?";
      } else if (input.includes("diet") || input.includes("nutrition") || input.includes("food")) {
        return "🥗 Nutrition is key to reaching your goals! Check out our nutrition insights section above. I can help you track calories, plan meals, or answer questions about macronutrients.";
      } else if (input.includes("weight") || input.includes("lose") || input.includes("gain")) {
        return "⚖️ Weight management is about consistency! Use our BMI calculator and progress tracker above. Remember: sustainable change happens gradually with proper nutrition and exercise.";
      } else if (input.includes("bmi") || input.includes("calculator")) {
        return "📊 Great question! Our BMI calculator above can help assess your body mass index. Remember, BMI is just one metric - muscle mass, body composition, and overall health are equally important!";
      } else if (input.includes("motivation") || input.includes("help") || input.includes("start")) {
        return "🔥 You&apos;ve got this! Starting is the hardest part. Use our &apos;Get Motivated&apos; button above for inspiration, track your progress, and remember - every small step counts toward your bigger goals!";
      } else if (input.includes("plan") || input.includes("program")) {
        return "📋 I see you&apos;re interested in fitness plans! Check out our sample plans above or click &apos;Build Your Program&apos; to create a personalized routine. Consistency beats perfection every time!";
      } else {
        return "🤖 I'm here to help with your fitness journey! I can assist with workouts, nutrition, motivation, progress tracking, and more. Try asking me about diet plans, exercises, or how to stay motivated!";
      }
    };
    
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        {
          role: "bot",
          content: generateAIResponse(chatInput),
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
                <div className="group flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                  <div className="text-2xl text-primary font-bold group-hover:text-yellow-400 transition-colors">500+</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">ACTIVE USERS</div>
                  <div className="w-8 h-px bg-primary/50 mt-1 group-hover:bg-yellow-400/50 transition-colors"></div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="group flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                  <div className="text-2xl text-primary font-bold group-hover:text-yellow-400 transition-colors">3min</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">GENERATION</div>
                  <div className="w-8 h-px bg-primary/50 mt-1 group-hover:bg-yellow-400/50 transition-colors"></div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="group flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                  <div className="text-2xl text-primary font-bold group-hover:text-yellow-400 transition-colors">100%</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">PERSONALIZED</div>
                  <div className="w-8 h-px bg-primary/50 mt-1 group-hover:bg-yellow-400/50 transition-colors"></div>
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
                  onClick={() => {
                    const newQuote = getRandomQuote();
                    setQuote(newQuote);
                    showToast("New motivation loaded! 💪", "success");
                  }}
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4 font-mono">BMI Calculator</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
            <p className="text-white/70 mt-3 font-mono">Know your Body Mass Index instantly</p>
          </div>
          
          <div className="bg-black/60 border border-primary/30 rounded-2xl p-6 shadow-2xl">
            <form
              className="flex flex-col sm:flex-row gap-4 mb-6"
              onSubmit={handleBmiCalculate}
            >
              <div className="flex-1 relative">
                <label className="block text-xs font-mono text-yellow-400 mb-2">HEIGHT (CM)</label>
                <input
                  className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                  placeholder="175"
                  value={bmiHeight}
                  onChange={e => setBmiHeight(e.target.value.replace(/[^0-9.]/g, ""))}
                  required
                  inputMode="decimal"
                />
              </div>
              <div className="flex-1 relative">
                <label className="block text-xs font-mono text-yellow-400 mb-2">WEIGHT (KG)</label>
                <input
                  className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                  placeholder="70"
                  value={bmiWeight}
                  onChange={e => setBmiWeight(e.target.value.replace(/[^0-9.]/g, ""))}
                  required
                  inputMode="decimal"
                />
              </div>
              <Button 
                type="submit" 
                className="self-end bg-gradient-to-r from-primary to-yellow-400 text-black font-mono font-bold px-6 py-3 hover:shadow-lg transition-all"
              >
                Calculate BMI
              </Button>
              {bmi !== null && (
                <Button
                  type="button"
                  variant="outline"
                  className="self-end border-primary/50 text-primary hover:bg-primary/10 font-mono px-6 py-3"
                  onClick={() => {
                    setBmi(null);
                    setBmiHeight("");
                    setBmiWeight("");
                  }}
                >
                  Reset
                </Button>
              )}
            </form>
            
            {bmi !== null && (
              <div className="bg-gradient-to-r from-primary/10 to-yellow-400/10 border border-primary/50 rounded-xl p-6 shadow-lg animate-fade-in">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary font-mono mb-2">{bmi}</div>
                  <div className="text-lg font-mono text-yellow-400 mb-3">{bmiCategory(bmi)}</div>
                  <div className="flex justify-center">
                    <div className={`px-4 py-2 rounded-full text-sm font-mono ${
                      bmi < 18.5 ? 'bg-blue-500/20 text-blue-400' :
                      bmi < 25 ? 'bg-green-500/20 text-green-400' :
                      bmi < 30 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {bmi < 18.5 ? '⬇️ Underweight' :
                       bmi < 25 ? '✅ Normal Range' :
                       bmi < 30 ? '⚠️ Overweight' :
                       '🚨 Obesity Range'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CALORIE CALCULATOR SECTION */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4 font-mono">Calorie Calculator</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
            <p className="text-white/70 mt-3 font-mono">Track your daily caloric intake</p>
          </div>
          
          <div className="bg-black/60 border border-primary/30 rounded-2xl p-6 shadow-2xl">
            <form
              className="flex flex-col sm:flex-row gap-4 mb-6"
              onSubmit={handleAddEntry}
            >
              <div className="flex-1 relative">
                <label className="block text-xs font-mono text-yellow-400 mb-2">FOOD ITEM</label>
                <input
                  ref={foodInputRef}
                  className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                  placeholder="e.g. Chicken Breast, Apple, Rice..."
                  value={food}
                  onChange={e => setFood(e.target.value)}
                  required
                />
              </div>
              <div className="w-32 relative">
                <label className="block text-xs font-mono text-yellow-400 mb-2">CALORIES</label>
                <input
                  className="w-full rounded-lg border border-primary/40 bg-black/40 px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all"
                  placeholder="150"
                  value={calories}
                  onChange={e => setCalories(e.target.value.replace(/[^0-9]/g, ""))}
                  required
                  inputMode="numeric"
                />
              </div>
              <Button 
                type="submit" 
                className="self-end bg-gradient-to-r from-primary to-yellow-400 text-black font-mono font-bold px-6 py-3 hover:shadow-lg transition-all"
              >
                Add Entry
              </Button>
            </form>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calorie Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary/20 to-yellow-400/20 border border-primary/50 rounded-xl p-6 text-center">
                  <div className="text-sm font-mono text-yellow-400 mb-2">TOTAL CALORIES</div>
                  <div className="text-4xl font-bold text-primary font-mono mb-2">{totalCalories}</div>
                  <div className="text-sm font-mono text-white/70">kcal today</div>
                  <div className="mt-4 h-2 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-yellow-400 transition-all duration-500"
                      style={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs font-mono text-white/60 mt-2 mb-4">
                    Target: 2000 kcal
                  </div>
                  {entries.length > 0 && (
                    <Button
                      onClick={clearEntries}
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 font-mono text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Entries Table */}
              <div className="lg:col-span-2">
                <div className="bg-black/40 border border-primary/30 rounded-xl p-4 max-h-64 overflow-y-auto">
                  <h3 className="text-sm font-mono text-yellow-400 mb-3 flex items-center gap-2">
                    📊 TODAY&apos;S ENTRIES
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                      {entries.length} items
                    </span>
                  </h3>
                  
                  {entries.length > 0 ? (
                    <div className="space-y-2">
                      {entries.map((entry, i) => (
                        <div key={i} className="flex justify-between items-center bg-black/60 rounded-lg p-3 border border-primary/20 group">
                          <div className="flex-1">
                            <span className="font-mono text-white">{entry.food}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-primary font-bold">{entry.calories} kcal</span>
                            <button
                              onClick={() => removeEntry(i)}
                              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all p-1 rounded"
                              title="Remove entry"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🍽️</div>
                      <div className="text-muted-foreground font-mono">No entries yet</div>
                      <div className="text-xs text-white/60 font-mono mt-1">Add your first meal above</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE DIET PLANS SECTION */}
      <section className="container mx-auto px-4 py-12 relative">
        {/* Section header with animated underline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4 font-mono">Sample Diet Plans</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
          <p className="text-white/70 mt-4 font-mono">AI-curated nutrition plans for every goal</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_DIETS.map((diet, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-black/60 border border-primary/30 shadow-lg p-6 flex flex-col gap-3 hover:scale-105 hover:border-primary/60 transition-all duration-300 relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-yellow-400">{diet.name}</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs font-mono mb-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30">
                    🔥 {diet.calories} kcal
                  </span>
                  <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30">
                    🍽️ {diet.meals.length} meals/day
                  </span>
                </div>
                
                <div className="space-y-3">
                  {diet.meals.map((meal, i) => (
                    <div key={i} className="bg-black/40 rounded-lg p-3 border border-primary/20">
                      <span className="font-bold text-primary text-sm">{meal.name}:</span>
                      <div className="text-white/80 text-sm mt-1 font-mono">
                        {meal.foods.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-primary/80 to-yellow-400/80 hover:from-primary hover:to-yellow-400 text-black font-mono"
                  size="sm"
                  onClick={() => {
                    showToast(`🎯 "${diet.name}" diet plan selected! Plan details saved to your profile.`, "success");
                  }}
                >
                  Get This Plan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE FITNESS PLANS */}
      <section className="container mx-auto px-4 py-12 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4 font-mono">Sample Fitness Plans</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
          <p className="text-white/70 mt-4 font-mono">Professional workout routines powered by AI</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-black/60 border border-primary/30 shadow-lg p-6 flex flex-col gap-4 hover:scale-105 hover:border-primary/60 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-yellow-400">{plan.name}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm mb-4 font-mono">{plan.description}</p>
                
                <div className="flex flex-wrap gap-2 text-xs font-mono mb-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 flex items-center gap-1">
                    💪 {plan.focus}
                  </span>
                  <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30 flex items-center gap-1">
                    📅 {plan.days.length} days/week
                  </span>
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1">
                    🔥 {plan.calories} kcal
                  </span>
                </div>
                
                <div className="bg-black/40 rounded-lg p-3 border border-primary/20 mb-4">
                  <div className="text-xs text-yellow-400 font-mono mb-1">SCHEDULE:</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {plan.days.join(" • ")}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary/80 to-yellow-400/80 hover:from-primary hover:to-yellow-400 text-black font-mono text-xs"
                    size="sm"
                    onClick={() => {
                      showToast(`🏋️ Starting "${plan.name}" workout plan! Check your profile for schedule.`, "success");
                    }}
                  >
                    Start Plan
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary/10 font-mono text-xs"
                    size="sm"
                    onClick={() => {
                      showToast(`👀 Preview: "${plan.name}" - ${plan.focus}, ${plan.days.length} days/week`, "info");
                    }}
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProgressTracker />

      <WorkoutTimer />

      <NutritionInsights />

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

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 font-mono text-sm shadow-lg animate-fade-in ${
          toast.type === 'success' ? 'bg-green-900/90 border border-green-500/50 text-green-200' :
          toast.type === 'error' ? 'bg-red-900/90 border border-red-500/50 text-red-200' :
          'bg-blue-900/90 border border-blue-500/50 text-blue-200'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default HomePage;
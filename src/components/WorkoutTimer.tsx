"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { PlayIcon, PauseIcon, RotateCcwIcon, TimerIcon, SkipForwardIcon } from "lucide-react";

interface Exercise {
  name: string;
  duration: number; // in seconds
  rest: number; // rest time in seconds
  sets?: number;
}

const WorkoutTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const defaultWorkout: Exercise[] = [
    { name: "Push-ups", duration: 45, rest: 15, sets: 3 },
    { name: "Squats", duration: 45, rest: 15, sets: 3 },
    { name: "Plank", duration: 30, rest: 15, sets: 3 },
    { name: "Burpees", duration: 30, rest: 15, sets: 2 },
    { name: "Mountain Climbers", duration: 45, rest: 15, sets: 2 },
  ];

  const [workout] = useState<Exercise[]>(defaultWorkout);
  const currentExercise = workout[currentExerciseIndex];
  const targetTime = isResting ? currentExercise?.rest || 15 : currentExercise?.duration || 45;

  useEffect(() => {
    if (isActive && currentTime < targetTime) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= targetTime && isActive) {
      // Time's up for current phase
      if (isResting) {
        // Rest is over, start next set or exercise
        if (currentSet < (currentExercise?.sets || 1)) {
          setCurrentSet(prev => prev + 1);
          setIsResting(false);
          setCurrentTime(0);
        } else {
          // Move to next exercise
          if (currentExerciseIndex < workout.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setCurrentSet(1);
            setIsResting(false);
            setCurrentTime(0);
          } else {
            // Workout completed
            setWorkoutCompleted(true);
            setIsActive(false);
          }
        }
      } else {
        // Exercise is over, start rest
        setIsResting(true);
        setCurrentTime(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentTime, targetTime, isResting, currentExerciseIndex, currentSet, workout, currentExercise]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentTime(0);
    setIsResting(false);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setWorkoutCompleted(false);
  };

  const skipToNext = () => {
    if (isResting) {
      if (currentSet < (currentExercise?.sets || 1)) {
        setCurrentSet(prev => prev + 1);
        setIsResting(false);
        setCurrentTime(0);
      } else {
        if (currentExerciseIndex < workout.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
          setCurrentSet(1);
          setIsResting(false);
          setCurrentTime(0);
        }
      }
    } else {
      setIsResting(true);
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / targetTime) * 100;

  if (workoutCompleted) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-to-br from-green-900/60 to-black/60 border-green-400/50 p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-400 mb-4 font-mono">Workout Complete!</h2>
            <p className="text-white/80 font-mono mb-6">Great job! You&apos;ve completed your workout session.</p>
            <Button 
              onClick={resetTimer}
              className="bg-gradient-to-r from-primary to-yellow-400 text-black font-mono font-bold"
            >
              Start New Workout
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4 font-mono">Workout Timer</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto rounded-full animate-pulse"></div>
        <p className="text-white/70 mt-3 font-mono">Stay focused with guided timing</p>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="bg-black/60 border-primary/30 p-8">
          {/* Current Exercise Info */}
          <div className="text-center mb-6">
            <div className="text-sm font-mono text-yellow-400 mb-2">
              EXERCISE {currentExerciseIndex + 1} OF {workout.length}
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2 font-mono">
              {currentExercise?.name || "Ready?"}
            </h3>
            <div className="text-sm font-mono text-white/70">
              Set {currentSet} of {currentExercise?.sets || 1}
            </div>
          </div>

          {/* Timer Display */}
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto relative">
              {/* Progress Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(24, 206, 242, 0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={isResting ? "#fbbf24" : "#18cef2"}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (progress / 100) * 283}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              
              {/* Timer Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-primary font-mono">
                  {formatTime(targetTime - currentTime)}
                </div>
                <div className="text-sm font-mono text-yellow-400 mt-1">
                  {isResting ? "REST" : "WORK"}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono ${
              isResting 
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                : 'bg-primary/20 text-primary border border-primary/30'
            }`}>
              <TimerIcon className="w-4 h-4" />
              {isResting ? `Rest Time: ${targetTime - currentTime}s` : `Exercise Time: ${targetTime - currentTime}s`}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              className="bg-gradient-to-r from-primary to-yellow-400 text-black font-mono font-bold px-6 py-3 hover:shadow-lg transition-all"
            >
              {isActive ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 font-mono px-6 py-3"
            >
              <RotateCcwIcon className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={skipToNext}
              variant="outline"
              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 font-mono px-6 py-3"
            >
              <SkipForwardIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Workout Preview */}
          <div className="mt-8 pt-6 border-t border-primary/30">
            <div className="text-xs font-mono text-yellow-400 mb-3">WORKOUT PLAN</div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {workout.map((exercise, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between text-xs font-mono p-2 rounded ${
                    idx === currentExerciseIndex 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/60'
                  }`}
                >
                  <span>{exercise.name}</span>
                  <span>{exercise.duration}s × {exercise.sets}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WorkoutTimer;

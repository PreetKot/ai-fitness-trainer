"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const sampleChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Calories Burned",
      data: [400, 600, 550, 700, 800, 650, 500],
      backgroundColor: "rgba(255, 206, 86, 0.7)",
      borderRadius: 8,
    },
  ],
};

const sampleTableData = [
  { day: "Monday", workout: "Chest & Triceps", duration: "60 min" },
  { day: "Tuesday", workout: "Back & Biceps", duration: "55 min" },
  { day: "Wednesday", workout: "Legs", duration: "70 min" },
  { day: "Thursday", workout: "Shoulders", duration: "50 min" },
  { day: "Friday", workout: "Cardio", duration: "40 min" },
];

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  const [typedMsg, setTypedMsg] = useState("");
  const [sending, setSending] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Ignore "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return;
      }
      return originalError.call(console, msg, ...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  // auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ends
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };
    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const handleError = (error: any) => {
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        setConnecting(false);
      }
    }
  };

  // Handle sending typed message
  const handleSendTypedMsg = async () => {
    if (!typedMsg.trim()) return;
    setSending(true);
    // Simulate AI reply (replace with your API call)
    setMessages((prev) => [...prev, { content: typedMsg, role: "user" }]);
    setTypedMsg("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: "Here's a personalized suggestion based on your input!",
          role: "assistant",
        },
      ]);
      setSending(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24 bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span>Generate Your </span>
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a voice or text conversation with our AI assistant to create your personalized plan
          </p>
        </div>

        {/* VIDEO CALL AREA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI ASSISTANT CARD */}
          <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* AI VOICE ANIMATION */}
              <div
                className={`absolute inset-0 ${
                  isSpeaking ? "opacity-30" : "opacity-0"
                } transition-opacity duration-300`}
              >
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                        isSpeaking ? "animate-sound-wave" : ""
                      }`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* AI IMAGE */}
              <div className="relative size-32 mb-4">
                <div
                  className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
                    isSpeaking ? "animate-pulse" : ""
                  }`}
                />
                <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
                  <img
                    src="/ai-avatar.png"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">CBUM AI</h2>
              <p className="text-sm text-muted-foreground mt-1">Fitness & Diet Coach</p>
              <div
                className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                  isSpeaking ? "border-primary" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                    ? "Listening..."
                    : callEnded
                    ? "Redirecting to profile..."
                    : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* USER CARD */}
          <Card className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative`}>
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              <div className="relative size-32 mb-4">
                <img
                  src={user?.imageUrl}
                  alt="User"
                  className="size-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">You</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
              </p>
              <div className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}>
                <div className={`w-2 h-2 rounded-full bg-muted`} />
                <span className="text-xs text-muted-foreground">Ready</span>
              </div>
            </div>
          </Card>
        </div>

        {/* MESSAGE CONTAINER & TYPING AREA */}
        <div className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-80 flex flex-col">
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto transition-all duration-300 scroll-smooth space-y-3"
          >
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground font-mono pt-8">
                Start a conversation by voice or type your message below!
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className="message-item animate-fadeIn">
                <div className="font-semibold text-xs text-muted-foreground mb-1">
                  {msg.role === "assistant" ? "CBUM AI" : "You"}:
                </div>
                <p className="text-foreground">{msg.content}</p>
              </div>
            ))}
            {callEnded && (
              <div className="message-item animate-fadeIn">
                <div className="font-semibold text-xs text-primary mb-1">System:</div>
                <p className="text-foreground">
                  Your fitness program has been created! Redirecting to your profile...
                </p>
              </div>
            )}
          </div>
          {/* Typing area */}
          <form
            className="flex gap-2 mt-4"
            onSubmit={e => {
              e.preventDefault();
              handleSendTypedMsg();
            }}
          >
            <input
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Type your message..."
              value={typedMsg}
              onChange={e => setTypedMsg(e.target.value)}
              disabled={sending || callEnded}
            />
            <Button
              type="submit"
              disabled={sending || !typedMsg.trim() || callEnded}
              className="rounded-lg"
            >
              {sending ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>

        {/* CHART & TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chart */}
          <Card className="p-6 bg-card/90 border border-primary/30 shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-primary font-mono">Weekly Calories Burned</h3>
            <Bar data={sampleChartData} options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              scales: {
                x: { grid: { color: "#444" }, ticks: { color: "#fff" } },
                y: { grid: { color: "#444" }, ticks: { color: "#fff" } },
              },
            }} />
          </Card>
          {/* Table */}
          <Card className="p-6 bg-card/90 border border-primary/30 shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-primary font-mono">Sample Workout Plan</h3>
            <table className="w-full text-left font-mono">
              <thead>
                <tr>
                  <th className="pb-2 text-yellow-400">Day</th>
                  <th className="pb-2 text-yellow-400">Workout</th>
                  <th className="pb-2 text-yellow-400">Duration</th>
                </tr>
              </thead>
              <tbody>
                {sampleTableData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2">{row.day}</td>
                    <td className="py-2">{row.workout}</td>
                    <td className="py-2">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* CALL CONTROLS */}
        <div className="w-full flex justify-center gap-4 mt-10">
          <Button
            className={`w-40 text-xl rounded-3xl ${
              callActive
                ? "bg-destructive hover:bg-destructive/90"
                : callEnded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            } text-white relative`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
            )}
            <span>
              {callActive
                ? "End Call"
                : connecting
                ? "Connecting..."
                : callEnded
                ? "View Profile"
                : "Start Call"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateProgramPage;
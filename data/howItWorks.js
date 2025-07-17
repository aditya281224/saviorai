import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Tell SaviorAI about your background and industry to unlock tailored career support.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craft Your Documents",
    description: "Generate polished, ATS-ready resumes and impactful cover letters with ease.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Prepare for Interviews",
    description: "Ace your interviews with SaviorAI's smart practice sessions designed for your role.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description: "Review detailed insights and performance data to measure your growth over time.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];

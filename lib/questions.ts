export type AnswerKey = "style" | "usage" | "shape" | "palette";

export type QuestionOption = {
  value: string;
  label: string;
  description: string;
};

export type Question = {
  key: AnswerKey;
  prompt: string;
  hint: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    key: "style",
    prompt: "What's the vibe you're after?",
    hint: "Pick the energy you want them to give off.",
    options: [
      { value: "minimal", label: "Minimal", description: "Quiet lines, nothing extra" },
      { value: "retro", label: "Retro", description: "Echoes of another decade" },
      { value: "bold", label: "Bold", description: "Statement-first, full presence" },
      { value: "sporty", label: "Sporty", description: "Built for motion" },
    ],
  },
  {
    key: "usage",
    prompt: "Where will you wear them most?",
    hint: "The scene shapes the lens.",
    options: [
      { value: "city", label: "City", description: "Streets, cafés, afternoons" },
      { value: "beach", label: "Beach", description: "Bright water, long horizon" },
      { value: "driving", label: "Driving", description: "Sun cutting the windshield" },
      { value: "mountain", label: "Mountain", description: "High light, sharp air" },
    ],
  },
  {
    key: "shape",
    prompt: "Which silhouette feels right?",
    hint: "Trust the first one that catches your eye.",
    options: [
      { value: "round", label: "Round", description: "Soft circles, classic curve" },
      { value: "square", label: "Square", description: "Structured, architectural" },
      { value: "aviator", label: "Aviator", description: "Teardrop, weight at the bottom" },
      { value: "catEye", label: "Cat-eye", description: "Lifted outer corners" },
      { value: "wayfarer", label: "Wayfarer", description: "Angled, timeless" },
    ],
  },
  {
    key: "palette",
    prompt: "Which palette pulls you in?",
    hint: "The tone that feels like you.",
    options: [
      { value: "mono", label: "Mono", description: "Black, white, graphite" },
      { value: "warm", label: "Warm", description: "Gold, tortoise, rose" },
      { value: "cool", label: "Cool", description: "Silver, navy, ice" },
      { value: "colorful", label: "Bold color", description: "Saturated, unafraid" },
    ],
  },
];

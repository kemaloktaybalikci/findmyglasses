"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { products as productList } from "@/lib/products";
import { questions } from "@/lib/questions";
import { scoreAll, type Answers } from "@/lib/scoring";
import { computePositions, type Stage } from "@/lib/layout";
import { ProductCloud } from "./product-cloud";
import { IntroScreen } from "./intro-screen";
import { QuestionStep } from "./question-step";
import { ResultScreen } from "./result-screen";

export function Finder() {
  const [stage, setStage] = useState<Stage>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const scored = useMemo(() => scoreAll(productList, answers), [answers]);
  const hasAnswers = Object.keys(answers).length > 0;
  const positions = useMemo(
    () => computePositions(scored, stage, hasAnswers),
    [scored, stage, hasAnswers],
  );
  const topProduct = useMemo(() => {
    if (stage === "intro") return null;
    return [...scored].sort((a, b) => b.score - a.score)[0];
  }, [scored, stage]);

  return (
    <div className="relative h-svh w-screen overflow-hidden bg-white">
      <AmbientBackdrop />
      <ProductCloud
        products={scored}
        positions={positions}
        stage={stage}
        topId={topProduct?.id ?? null}
      />
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroScreen
            key="intro"
            onStart={() => {
              setStage("questioning");
              setStepIndex(0);
            }}
          />
        )}
        {stage === "questioning" && (
          <QuestionStep
            key={`q-${stepIndex}`}
            question={questions[stepIndex]}
            stepIndex={stepIndex}
            totalSteps={questions.length}
            onAnswer={(key, value) => {
              const next = { ...answers, [key]: value } as Answers;
              setAnswers(next);
              if (stepIndex < questions.length - 1) {
                setStepIndex(stepIndex + 1);
              } else {
                setStage("result");
              }
            }}
          />
        )}
        {stage === "result" && topProduct && (
          <ResultScreen
            key="result"
            top={topProduct}
            onReset={() => {
              setAnswers({});
              setStepIndex(0);
              setStage("intro");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.025) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
    </div>
  );
}

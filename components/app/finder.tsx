"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { products as productList } from "@/lib/products";
import { questions } from "@/lib/questions";
import { scoreAll, type Answers } from "@/lib/scoring";
import { computePositions, type Stage, type Viewport } from "@/lib/layout";
import { ProductCloud } from "./product-cloud";
import { ProductPanel } from "./product-panel";
import { ProductList } from "./product-list";
import { IntroScreen } from "./intro-screen";
import { QuestionStep } from "./question-step";
import { ResultScreen, type ResultView } from "./result-screen";

const FALLBACK_VIEWPORT: Viewport = { width: 1280, height: 800 };

export function Finder() {
  const [stage, setStage] = useState<Stage>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resultView, setResultView] = useState<ResultView>("cloud");
  const [viewport, setViewport] = useState<Viewport>(FALLBACK_VIEWPORT);

  useEffect(() => {
    const sync = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scored = useMemo(() => scoreAll(productList, answers), [answers]);
  const hasAnswers = Object.keys(answers).length > 0;
  const panelOpenForLayout = selectedId !== null && viewport.width >= 640;
  const layoutViewport = useMemo(
    () => ({
      width: panelOpenForLayout
        ? Math.max(360, viewport.width - 400)
        : viewport.width,
      height: viewport.height,
    }),
    [viewport, panelOpenForLayout],
  );
  const positions = useMemo(
    () => computePositions(scored, stage, hasAnswers, layoutViewport),
    [scored, stage, hasAnswers, layoutViewport],
  );
  const topProduct = useMemo(() => {
    if (stage === "intro") return null;
    return [...scored].sort((a, b) => b.score - a.score)[0];
  }, [scored, stage]);
  const selectedProduct = useMemo(
    () => (selectedId ? scored.find((p) => p.id === selectedId) ?? null : null),
    [scored, selectedId],
  );

  const closePanel = () => setSelectedId(null);
  const showCloud = stage !== "result" || resultView === "cloud";

  const panelOpen = selectedProduct !== null;

  return (
    <div
      className={`relative h-svh w-screen overflow-hidden bg-white transition-[padding-right] duration-300 ease-out ${
        panelOpen ? "sm:pr-[400px]" : "pr-0"
      }`}
    >
      <AmbientBackdrop />
      {showCloud && (
        <ProductCloud
          products={scored}
          positions={positions}
          stage={stage}
          topId={topProduct?.id ?? null}
          selectedId={selectedId}
          onSelect={setSelectedId}
          dimmed={false}
        />
      )}
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroScreen
            key="intro"
            onStart={() => {
              setStage("questioning");
              setStepIndex(0);
              setSelectedId(null);
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
            view={resultView}
            onViewChange={(v) => {
              setResultView(v);
              setSelectedId(null);
            }}
            onReset={() => {
              setAnswers({});
              setStepIndex(0);
              setStage("intro");
              setSelectedId(null);
              setResultView("cloud");
            }}
          />
        )}
      </AnimatePresence>

      {stage === "result" && resultView === "list" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-2 pb-32 pt-44">
          <div className="pointer-events-auto max-h-full w-full overflow-y-auto">
            <ProductList
              products={scored}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      )}

      <ProductPanel
        product={selectedProduct}
        stage={stage}
        hasAnswers={hasAnswers}
        onClose={closePanel}
      />
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

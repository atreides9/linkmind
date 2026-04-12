import { motion } from "motion/react";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import { Sparkles, Network, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-canvas">
      {/* Navbar */}
      <nav className="h-16 flex items-center justify-between px-8 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-default" />
          <h2 className="font-semibold text-[20px] text-brand-default">Insight Dots</h2>
        </div>
        <div className="flex items-center gap-3">
          <ButtonSecondary onClick={() => navigate('/login')}>Log in</ButtonSecondary>
          <ButtonPrimary onClick={() => navigate('/onboarding')}>Get started free</ButtonPrimary>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-40"
        >
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="text-[12px] font-semibold text-brand-default uppercase tracking-wide">
              AI-powered knowledge graph
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[32px] font-semibold text-text-primary leading-[1.5] tracking-[-0.01em] mb-4">
            Your ideas, connected.
          </h1>

          {/* Subhead */}
          <p className="text-[16px] font-medium text-text-secondary leading-[1.5] mb-10">
            흩어진 노트를 AI가 자동으로 연결하고 인사이트로 만들어드립니다.
          </p>

          {/* CTA Row */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <ButtonPrimary onClick={() => navigate('/onboarding')} className="h-12 px-8">
              무료로 시작하기
            </ButtonPrimary>
            <ButtonSecondary className="h-12 px-8">데모 보기</ButtonSecondary>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[960px] mx-auto bg-bg-surface border border-border-subtle rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-12 relative overflow-hidden"
          >
            {/* Dot Grid Background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, var(--gray-800) 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Sample Nodes with Connections */}
            <div className="relative h-80">
              {/* Sample nodes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute left-[10%] top-[20%] w-48 h-24 bg-node-bg border border-node-border rounded-[var(--radius-lg)] p-4 shadow-[var(--node-shadow)]"
              >
                <h3 className="text-[14px] font-semibold text-text-primary mb-1">AI와 창의성</h3>
                <p className="text-[12px] text-text-secondary line-clamp-2">인공지능은 인간의 창의성을 증폭시키는...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute right-[10%] top-[15%] w-48 h-24 bg-node-bg border border-node-border-selected rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-glow-primary)]"
              >
                <h3 className="text-[14px] font-semibold text-text-primary mb-1">UX 리서치</h3>
                <p className="text-[12px] text-text-secondary line-clamp-2">사용자 행동 패턴 분석 결과...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute left-[25%] bottom-[20%] w-48 h-24 bg-node-bg border border-node-border rounded-[var(--radius-lg)] p-4 shadow-[var(--node-shadow)]"
              >
                <h3 className="text-[14px] font-semibold text-text-primary mb-1">인사이트 발견</h3>
                <p className="text-[12px] text-text-secondary line-clamp-2">연결된 노트에서 새로운 패턴을...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="absolute right-[20%] bottom-[15%] w-48 h-24 bg-node-bg border border-node-border rounded-[var(--radius-lg)] p-4 shadow-[var(--node-shadow)]"
              >
                <h3 className="text-[14px] font-semibold text-text-primary mb-1">프로덕트 아이디어</h3>
                <p className="text-[12px] text-text-secondary line-clamp-2">새로운 기능에 대한 아이디어...</p>
              </motion.div>

              {/* Connection lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                  d="M 180 100 C 300 100, 400 100, 520 100"
                  stroke="var(--connection-active)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
                <motion.path
                  d="M 250 180 C 300 200, 400 220, 500 240"
                  stroke="var(--connection-line)"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1, delay: 1.4 }}
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-32 pb-32"
        >
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 text-brand-default">
              <Sparkles className="w-full h-full" />
            </div>
            <h2 className="text-[20px] font-semibold text-text-primary mb-2">AI Auto-Tagging</h2>
            <p className="text-[14px] font-medium text-text-secondary">
              AI가 노트 내용을 분석해 자동으로 태그를 생성하고 관련 노트를 연결합니다.
            </p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 text-brand-default">
              <Network className="w-full h-full" />
            </div>
            <h2 className="text-[20px] font-semibold text-text-primary mb-2">Visual Graph</h2>
            <p className="text-[14px] font-medium text-text-secondary">
              아이디어 간의 연결을 시각적 그래프로 확인하고 새로운 관계를 발견하세요.
            </p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 text-brand-default">
              <Lightbulb className="w-full h-full" />
            </div>
            <h2 className="text-[20px] font-semibold text-text-primary mb-2">Insight Discovery</h2>
            <p className="text-[14px] font-medium text-text-secondary">
              연결된 노트에서 숨겨진 패턴과 인사이트를 자동으로 찾아드립니다.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

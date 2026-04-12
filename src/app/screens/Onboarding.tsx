import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const onboardingSteps = [
  {
    title: "노트 작성하기",
    description: "아이디어를 자유롭게 기록하세요",
    content: (
      <div className="space-y-4">
        <h3 className="text-[20px] font-semibold text-text-primary">노트 만들기</h3>
        <p className="text-[16px] text-text-secondary leading-relaxed">
          캔버스 화면에서 <span className="text-brand-default font-semibold">+ 버튼</span>을 클릭하거나
          빈 공간을 더블클릭하여 새 노트를 생성할 수 있습니다.
        </p>
        <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
          <h4 className="text-[14px] font-semibold text-text-primary mb-2">💡 팁</h4>
          <ul className="space-y-2 text-[14px] text-text-secondary">
            <li>• 제목과 내용을 작성하면 자동으로 저장됩니다</li>
            <li>• 마크다운 문법을 지원합니다 (# 헤딩, **볼드**, `코드` 등)</li>
            <li>• 노트를 클릭하면 상세 뷰에서 편집할 수 있습니다</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "AI 자동 태그",
    description: "AI가 노트 내용을 분석해 태그를 생성합니다",
    content: (
      <div className="space-y-4">
        <h3 className="text-[20px] font-semibold text-text-primary">AI 자동 태그 사용하기</h3>
        <p className="text-[16px] text-text-secondary leading-relaxed">
          노트를 작성하면 AI가 내용을 분석하여 자동으로 관련 태그를 제안합니다.
        </p>
        <div className="bg-bg-elevated border border-border-default rounded-lg p-4 space-y-3">
          <div>
            <h4 className="text-[14px] font-semibold text-text-primary mb-2">작동 방식</h4>
            <ol className="space-y-2 text-[14px] text-text-secondary list-decimal list-inside">
              <li>노트 편집 화면에서 내용을 작성</li>
              <li>"AI 자동 태그" 섹션에서 "생성하기" 클릭</li>
              <li>AI가 분석한 태그를 확인하고 선택</li>
            </ol>
          </div>
          <div className="pt-3 border-t border-border-subtle">
            <p className="text-[12px] text-text-disabled">
              태그는 노트를 분류하고 연결하는 데 사용됩니다
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "그래프 뷰",
    description: "노트 간의 연결을 시각화하세요",
    content: (
      <div className="space-y-4">
        <h3 className="text-[20px] font-semibold text-text-primary">지식 그래프 탐색</h3>
        <p className="text-[16px] text-text-secondary leading-relaxed">
          그래프 뷰에서 노트 간의 관계를 한눈에 파악할 수 있습니다.
        </p>
        <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
          <h4 className="text-[14px] font-semibold text-text-primary mb-2">인터랙션</h4>
          <ul className="space-y-2 text-[14px] text-text-secondary">
            <li>• <span className="font-semibold">클릭</span>: 노트 선택 및 상세 보기</li>
            <li>• <span className="font-semibold">드래그</span>: 노드 위치 조정</li>
            <li>• <span className="font-semibold">스크롤</span>: 확대/축소</li>
            <li>• <span className="font-semibold">패닝</span>: 화면 이동</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "즐겨찾기",
    description: "중요한 노트를 빠르게 찾으세요",
    content: (
      <div className="space-y-4">
        <h3 className="text-[20px] font-semibold text-text-primary">즐겨찾기 활용하기</h3>
        <p className="text-[16px] text-text-secondary leading-relaxed">
          자주 보는 노트를 즐겨찾기에 추가하여 사이드바에서 빠르게 접근할 수 있습니다.
        </p>
        <div className="bg-bg-elevated border border-border-default rounded-lg p-4 space-y-3">
          <div>
            <h4 className="text-[14px] font-semibold text-text-primary mb-2">사용 방법</h4>
            <ol className="space-y-2 text-[14px] text-text-secondary list-decimal list-inside">
              <li>노트 상세 페이지 상단의 ⭐ 별표 아이콘 클릭</li>
              <li>사이드바 "즐겨찾는 노트" 섹션에서 확인</li>
              <li>3개 이상일 경우 "더보기"로 전체 목록 보기</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const isFirst = currentStep === 0;
  const isLast = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate("/canvas");
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate("/canvas");
  };

  return (
    <div className="min-h-screen bg-bg-canvas flex items-center justify-center p-8">
      <div className="max-w-[700px] w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-brand-default' : 'bg-border-default'
                }`}
              />
            ))}
          </div>
          <p className="text-[12px] text-text-disabled text-center">
            {currentStep + 1} / {onboardingSteps.length}
          </p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-bg-surface border border-border-default rounded-[var(--radius-xl)] p-8 mb-8"
          >
            <div className="mb-6">
              <h2 className="text-[24px] font-semibold text-text-primary mb-2">
                {onboardingSteps[currentStep].title}
              </h2>
              <p className="text-[14px] text-text-secondary">
                {onboardingSteps[currentStep].description}
              </p>
            </div>

            {onboardingSteps[currentStep].content}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <ButtonSecondary onClick={handleSkip} className="px-6">
            건너뛰기
          </ButtonSecondary>

          <div className="flex items-center gap-3">
            <ButtonSecondary
              onClick={handlePrev}
              disabled={isFirst}
              className="px-6"
            >
              <ChevronLeft className="w-4 h-4" />
            </ButtonSecondary>

            <ButtonPrimary onClick={handleNext} className="px-6 flex items-center gap-2">
              {isLast ? (
                <>
                  <Check className="w-4 h-4" />
                  시작하기
                </>
              ) : (
                <>
                  다음
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}

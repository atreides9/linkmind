import { useParams, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Sidebar } from "../components/Sidebar";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ButtonIcon } from "../components/Button";
import { Settings, ChevronLeft, Edit, Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

// Sample markdown content
const sampleNotes: Record<string, { title: string; content: string; tags: string[] }> = {
  "1": {
    title: "AI와 창의성의 관계",
    tags: ["AI", "창의성"],
    content: `# AI와 창의성의 관계

## 개요

인공지능은 인간의 창의성을 증폭시키는 도구로 활용될 수 있다. 자동화를 통해 반복 작업을 줄이고, 인간은 더 창의적인 작업에 집중할 수 있게 된다.

## 주요 인사이트

- **도구로서의 AI**: AI는 창의성을 대체하는 것이 아니라 증폭시킨다
- **반복 작업 자동화**: 루틴한 작업을 AI에게 맡기고 인간은 전략적 사고에 집중
- **새로운 가능성**: AI를 통해 이전에는 불가능했던 창작 활동이 가능해짐

## 사례 연구

### 디자인 분야
디자이너들이 AI 도구를 활용하여 프로토타입 제작 시간을 70% 단축시킨 사례가 있다. 이를 통해 더 많은 아이디어를 빠르게 검증할 수 있었다.

### 콘텐츠 제작
AI 어시스턴트를 활용한 작가들은 초안 작성 속도가 2배 증가했으며, 더 많은 시간을 스토리 구조와 캐릭터 개발에 투자할 수 있게 되었다.

## 결론

AI와 인간 창의성의 관계는 대체가 아닌 **협업**의 관계다. 각자의 강점을 살려 시너지를 만들어낼 때 최고의 결과물이 나온다.`
  },
  "2": {
    title: "UX 리서치 인사이트",
    tags: ["UX", "리서치"],
    content: `# UX 리서치 인사이트

## 사용자 행동 패턴 분석

사용자 행동 패턴 분석 결과, 대부분의 사용자는 첫 화면에서 3초 이내에 행동을 결정한다는 것을 발견했다.

### 핵심 발견사항

1. **첫인상의 중요성**
   - 사용자의 80%가 3초 이내에 페이지를 떠날지 결정
   - 명확한 가치 제안이 필수적

2. **인터랙션 패턴**
   - 모바일 사용자: 엄지손가락 기준 하단 영역 선호
   - 데스크톱 사용자: F-패턴 스캔 경향

3. **정보 구조**
   - 3단계 이상의 계층은 회피 경향
   - 시각적 위계가 명확할수록 태스크 완료율 증가

## 사용자 인터뷰 요약

> "너무 많은 옵션이 오히려 혼란스러웠어요. 간단명료하게 해주세요."
>
> — 참가자 #07

## 실행 가능한 개선안

\`\`\`
1. 첫 화면 로딩 시간 1초 이내로 단축
2. 핵심 CTA 3개 이하로 제한
3. 모바일 터치 영역 최소 44×44px 확보
\`\`\`

## 다음 스텝

- [ ] A/B 테스트 설계
- [ ] 프로토타입 제작
- [ ] 사용자 테스트 2차 진행`
  },
  "3": {
    title: "프로덕트 아이디어",
    tags: ["아이디어", "프로덕트"],
    content: `# 프로덕트 아이디어

## 노트 간 자동 연결 시스템

### 문제 정의
사용자들이 작성한 노트가 많아질수록 관련된 정보를 찾기 어려워진다. 수동으로 링크를 만드는 것은 번거롭고 일관성이 떨어진다.

### 제안 솔루션

**AI 기반 자동 연결**
- 노트 내용의 의미를 분석하여 유사한 주제의 노트를 자동으로 연결
- 사용자가 읽고 있는 노트와 관련된 다른 노트를 실시간으로 추천
- 태그를 자동으로 생성하고 분류

### 기술 스택

\`\`\`javascript
// Semantic similarity using embeddings
const similarity = await calculateSimilarity(note1, note2);

if (similarity > THRESHOLD) {
  createConnection(note1.id, note2.id);
}
\`\`\`

### 기대 효과

- **생산성 향상**: 관련 정보 검색 시간 60% 단축
- **인사이트 발견**: 예상치 못한 연결 고리 발견
- **지식 그래프**: 개인 지식의 시각화

### 우선순위
🔴 High priority - Q2 2026 출시 목표`
  }
};

export function NoteView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const note = id ? sampleNotes[id] : null;
  const noteIsFavorite = id ? isFavorite(id) : false;

  if (!note) {
    return (
      <div className="h-full flex bg-bg-canvas items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary">노트를 찾을 수 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-bg-canvas">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <ButtonIcon
              icon={<ChevronLeft />}
              onClick={() => navigate(-1)}
              ariaLabel="뒤로 가기"
            />
            <h2 className="text-[16px] font-medium text-text-secondary">{note.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <ButtonIcon
              icon={<Star className={noteIsFavorite ? "fill-brand-default" : ""} />}
              onClick={() => id && toggleFavorite(id)}
              ariaLabel="즐겨찾기"
              className={noteIsFavorite ? "text-brand-default" : ""}
            />
            <ButtonIcon icon={<Edit />} ariaLabel="편집" />
            <ButtonIcon icon={<Settings />} onClick={() => navigate("/settings")} ariaLabel="설정" />
            <div className="w-8 h-8 rounded-full bg-brand-default flex items-center justify-center text-text-inverse text-[12px] font-semibold">
              U
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Markdown Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[800px] mx-auto px-12 py-8">
            <article className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {note.content}
              </ReactMarkdown>
            </article>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 bg-brand-subtle text-brand-default font-semibold text-[12px] rounded-[var(--radius-full)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

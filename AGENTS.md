# linkmind

노트/인사이트를 캔버스 위에서 카드 형태로 관리하고, 그래프로 연결 관계를 시각화하는 지식 관리 앱.

## 스택
- React 18 + TypeScript + Vite
- React Router 7 (`react-router`)
- Tailwind CSS 4 + CSS custom properties (`src/styles/theme.css`)
- Radix UI (shadcn 기반, `src/app/components/ui/`)
- Framer Motion (`motion/react`)
- D3 (force, selection, zoom)
- Lucide React (아이콘)

## 파일 구조
```
src/app/
  App.tsx              # 라우터 루트
  screens/             # 페이지 단위 컴포넌트
  components/          # 공통 컴포넌트 (NodeCard, Sidebar, Tag 등)
  components/ui/       # shadcn 기반 원자 컴포넌트
  context/             # FavoritesContext, TabsContext
src/styles/
  theme.css            # CSS 변수 정의 (컬러, 타이포, 스페이싱, 그림자)
  index.css
```

## 라우트
`/` → Landing, `/login` → Login, `/onboarding` → Onboarding
`/canvas` → Canvas (메인), `/graph` → GraphView, `/tags` → Tags
`/recent` → Recent, `/note/:id` → NoteView, `/settings` → Settings, `/search` → SearchResults

## 테마 (항상 CSS 변수 사용)
**배경**: `--bg-canvas` (#0D0F12) / `--bg-surface` (#212529) / `--bg-elevated` (#343A40)
**텍스트**: `--text-primary` / `--text-secondary` / `--text-disabled`
**브랜드**: `--brand-default` (#60A5FA) / `--brand-hover` / `--brand-active`
**보더**: `--border-default` / `--border-focus`
**노드**: `--node-bg` / `--node-border` / `--node-border-selected` / `--shadow-glow-primary`
**타이포**: `--text-body2` (14px, 기본) / `--text-body1` (16px) / `--text-caption` (12px)
**간격**: 8px 그리드 (`--spacing-2` = 8px, `--spacing-4` = 16px, ...)
**폰트**: Pretendard

## 컴포넌트 컨벤션
- Named export 사용 (`export function Foo`)
- Props interface 파일 상단에 정의
- motion 애니메이션: `initial/animate/whileHover` 패턴
- 노드 카드: `absolute` 포지셔닝, `x`/`y` props로 캔버스 위 배치
- 태그는 최대 3개 표시, 초과분은 `+N` 으로

## 주의사항
- CSS 하드코딩 금지 — 반드시 `theme.css` 변수 사용
- `components/ui/`는 수정하지 말고 그대로 사용
- 새 스크린은 `screens/`, 공통 컴포넌트는 `components/`에 추가
- 패키지 매니저: `npm` (pnpm-workspace 있지만 루트는 npm)

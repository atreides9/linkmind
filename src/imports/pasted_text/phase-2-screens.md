## PHASE 2: Screens

---

### Screen 1: Landing / Onboarding Page
Frame: 1920×1080, bg: bg/canvas

Layout:
- Top navbar (height: 64px): logo left, CTA buttons right (ButtonSecondary "Log in" + ButtonPrimary "Get started free")
- Hero section (centered, top: 160px from nav):
  - Eyebrow label: "AI-powered knowledge graph", Label/SemiBold, brand/default
  - H1: "Your ideas, connected.", Display/SemiBold, text/primary
  - Subhead: "흩어진 노트를 AI가 자동으로 연결하고 인사이트로 만들어드립니다.", Body1/Medium, text/secondary
  - CTA row: ButtonPrimary "무료로 시작하기" (height 48px) + ButtonSecondary "데모 보기"
  - Gap between headline and CTA: 40px
- Hero visual (below CTA, top: 80px gap):
  - Canvas preview mockup — dark surface (bg/surface) with 4–5 sample nodes connected, glow effect on connections
  - Width: 960px, centered, radius/xl, shadow/lg, border: 1px border/subtle
- Feature row (below hero, 3-column grid, gap 32px):
  - Each card: icon (32px, primary/400) + Heading2/SemiBold + Body2/Medium description
  - Features: "AI Auto-Tagging" / "Visual Graph" / "Insight Discovery"

---

### Screen 2: Login Page (Shell only — no auth logic)
Frame: 1920×1080, bg: bg/canvas

Layout:
- Centered card (480×400px), bg: bg/surface, radius: radius/xl, shadow/lg
- Logo + wordmark (top center of card)
- H2: "시작하기", Heading2/SemiBold
- Body2: "Google 계정으로 로그인하면 바로 시작할 수 있어요", text/secondary
- ButtonPrimary full-width (height 48px): Google icon (20px) + "Google로 계속하기"
  - Note to Figma Make: this is a placeholder shell — no actual auth flow, clicking leads to Screen 3
- Caption below: "계속하면 서비스 이용약관과 개인정보 처리방침에 동의하는 것으로 간주합니다", text/disabled

---

### Screen 3: Main Canvas
Frame: 1920×1080, bg: bg/canvas

Layout:
- Sidebar (left, fixed, 240px wide): Component 1-D
- Topbar (height: 56px, above canvas):
  - Left: workspace name (Heading2/SemiBold)
  - Center: search input (width 320px), placeholder "노트 검색..."
  - Right: ButtonIcon (settings) + user avatar (32px circle)
  - bg: bg/canvas, border-bottom: 1px border/subtle

- Canvas area (fills remaining space):
  - bg: bg/canvas with subtle dot grid pattern (gray/800, 1px dots, 24px spacing)
  - Populate with 6–8 sample NodeCard components in organic scattered layout
  - 4–5 ConnectionLine components linking nodes
  - 2 nodes in "selected" state showing glow
  - 1 node in "editing" state (inline edit active)
  - Node cluster: 3 tightly grouped nodes (demonstrating Law of Proximity — related topics visually grouped)

- Floating toolbar (bottom center of canvas, 48px height):
  - bg: bg/elevated, radius: radius/xl, shadow/md, border: 1px border/default
  - Items: [cursor icon] [node add +] [connection tool] [separator] [zoom out] [100%] [zoom in]
  - Each item: ButtonIcon style, 40×40px

- FAB (bottom right, 24px from edge):
  - 56×56px circle, bg: brand/default → hover: brand/hover
  - icon: + (24px, white)
  - shadow: shadow/glow-primary
  - Tooltip on hover: "더블클릭으로도 추가할 수 있어요", Caption

---

### Screen 4: Note Edit Modal
Trigger: click on NodeCard or FAB

Frame: overlay on Screen 3
Modal: 600×640px, centered, Component 1-G

Layout (padding: 32px):
- Title input: Input, placeholder "제목 없음", Heading2/SemiBold style, no visible border (borderless style, focus shows underline brand/default)
- Divider: 1px border/subtle, margin: 16px 0
- Content textarea: min-height 240px, borderless, Body2/Medium, placeholder "내용을 입력하세요...", resizable vertically
- AI Tagging section (below content, top border 1px border/subtle, padding-top 16px):
  - Row: sparkle icon (primary/400, 16px) + "AI 자동 태그", Label/SemiBold + status
  - Tag chips row: 3–4 AITagChip components (Component 1-H), showing "생성성" / "UX리서치" / "인사이트"
  - Loading state variant: shimmer chips (show as alternate state)
- Footer row (bottom of modal):
  - Left: "마지막 수정 2분 전", Caption, text/disabled
  - Right: ButtonGhost "삭제" (status/error text) + ButtonPrimary "저장"

States to show:
- Default (empty, new note)
- Filled (with content + AI tags loaded)
- Loading (AI tags generating — sparkle pulsing, chips shimmer)

---

### Screen 5: Sidebar Navigation Detail
Already included as Component 1-D — show as expanded standalone artboard
Frame: 240×1080px

Sections:
- Logo area (height 64px): "linkmind" wordmark, primary/400, Heading2/SemiBold + dot icon
- Section header: "내 워크스페이스", Caption/SemiBold, text/disabled, uppercase
- NavItem list: "전체 노트" (active) / "그래프 뷰" / "태그" / "최근 항목"
- Divider
- Section header: "최근 노트"
- 3 recent note NavItems: icon + truncated title
- Bottom: user profile row (avatar 32px + name Body2 + settings ButtonIcon)

---

## CONSTRAINTS & NOTES FOR FIGMA MAKE

1. All spacing must snap to 8px grid
2. Never use inline styles — reference design tokens only
3. Every interactive component must have all states (default / hover / active / disabled) as Figma variants
4. Component names must match exactly as defined above (e.g., "NodeCard", "ButtonPrimary", "AITagChip")
5. Auto-layout on all components — no absolute positioning inside components
6. Accessibility: all text/bg pairings verified AA (4.5:1 minimum) as specified in color tokens
7. Typography: Pretendard only. Apply SemiBold/Medium/Light as specified per hierarchy.
8. Screen frames use Responsive layout constraints: left+right for horizontal fill, top for vertical anchoring
9. Do not create separate files for screens — all in one Figma file with Pages: [Tokens] [Components] [Screens]
10. Build in this order: Tokens → Components → Screens (each phase confirmed before next)

# Skills

## /new-screen [이름] [설명]
`screens/` 에 새 스크린 컴포넌트 생성.
- Named export, TypeScript
- `theme.css` 변수만 사용
- `App.tsx` 라우트에 추가

## /new-component [이름] [설명]
`components/` 에 공통 컴포넌트 생성.
- Props interface 상단 정의
- motion 애니메이션 필요시 `motion/react` 사용
- `components/ui/` 원자 컴포넌트 재사용

## /new-context [이름]
`context/` 에 Context + Provider + useHook 세트 생성.
- 패턴: `createContext → Provider (useState) → useXxx hook`

## /canvas-node [기능 설명]
캔버스 노드 관련 기능 추가/수정.
- `NodeCard` 컴포넌트 기준
- 절대 포지셔닝 (`x`, `y` props)
- 선택/드래그/편집 상태 처리

## /theme-check
현재 파일에서 하드코딩된 색상/간격 찾아 `theme.css` 변수로 교체 제안.

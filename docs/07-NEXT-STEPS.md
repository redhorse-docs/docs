# NEXT STEPS – RedHorse Landing & Docs

## Completed Milestones
- ✅ 레드 계열 토큰/레이아웃 토큰 정의 (글로벌 CSS, 버튼, SectionShell)
- ✅ 랜딩 페이지 구조 확립: Hero → What → How → Membership → Token → Security → Roadmap → Community → FAQ
- ✅ Lorem 기반 mock 데이터 도입 + 섹션 컴포넌트 분리 (아이콘/이미지 리듬 포함)
- ✅ `/docs` 페이지 UI 업그레이드: 헤더/검색/네비/본문 카드 구성

## Next Action Checklist
- [ ] `components/sections/*`를 실제 copy/data source에 연결 (예: CMS, MDX, JSON) – 현재는 `lib/data/landing.mock.ts`
- [ ] 아이콘 컴포넌트(`PlaceholderIcon`)를 lucide-react 등 실제 아이콘으로 교체하고 토큰화
- [ ] `/docs/[...slug]` 라우트 확장 및 router-ready 데이터 구조 설계
- [ ] 멤버십/토큰 섹션에 상호작용(hover states, copy buttons) 추가
- [ ] `lib/data/docs.mock.ts`를 이용해 사이드바 트리 API 설계, 검색 입력 debounce 및 필터 추가
- [ ] 공통 페이지 전환 애니메이션 또는 스크롤 스냅 적용으로 섹션 간 리듬 강화
- [ ] Storybook 또는 Visual Regression 테스트 도구 세팅으로 레이아웃 회귀 검사

## Context Snapshot
이 파일을 새로운 Codex 세션에서 열면 최신 작업 히스토리와 todo를 빠르게 공유할 수 있습니다. 주요 구현 경로:
```
app/page.tsx               – 랜딩 구성 및 섹션 순서
components/sections/*      – 각 섹션 UI
components/layout/*        – Header/Footer/Container
lib/data/landing.mock.ts   – 랜딩 lorem 데이터
app/docs/page.tsx          – Docs 레이아웃
lib/data/docs.mock.ts      – Docs placeholder 네비/본문 데이터
```
다음 번에는 이 체크리스트 기준으로 진행 상황을 업데이트하고 남은 항목을 하나씩 해결하세요.

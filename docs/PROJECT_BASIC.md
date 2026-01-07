# Red-Horse (red-horse) – UI-first Landing + Docs Guide (for Codex)

> 목적: **텍스트/데이터 없이 레이아웃과 스타일링을 먼저** 완성한다.  
> 이후 단계에서 CMS/실제 카피/토큰 정보 등을 “교체”만 하면 되도록 컴포넌트 경계와 레이아웃을 단단하게 만든다.

---

## 0) Reference (UI/IA 참고)

- Ref A (커스텀 랜딩 느낌): https://shrub.io/
- Ref B (GitBook 문서 UX 참고): https://yellow-umbrella.gitbook.io/yellow-umbrella

**참고 방식**
- Ref A: 랜딩의 섹션 구성, CTA 배치, 정보 전달 흐름, 톤/여백/블록 기반 레이아웃 참고
- Ref B: Docs 영역의 문서 네비(사이드바), 헤더/검색/문서 읽기 경험 참고  
  (우리 프로젝트는 처음엔 `/docs`를 **placeholder**로 두고, 추후 Docs 시스템을 붙인다)

---

## 1) Scope (이번 단계에서 “반드시” 하는 것 / 하지 않는 것)

### ✅ Do (이번 단계 목표)
- 제공된 와이어프레임과 유사한 랜딩 레이아웃을 **UI-first로 구현**
- 반응형(Desktop / Tablet / Mobile) 레이아웃 완성
- 섹션별 컴포넌트 분리 및 재사용 가능한 구조 설계
- placeholder 텍스트/더미 데이터로 렌더링
- `/docs` 라우트 준비(내용은 최소/placeholder)

### ❌ Don’t (의도적으로 제외)
- CMS 연동(에디터/관리자) – 추후
- 실제 카피라이팅/실제 토크노믹스 수치 – 추후
- Web3/지갑 연결/토큰 가격 fetch – 제외
- SEO, GA, TagManager 최적화 – 추후
- 다국어(i18n), 버전관리(문서 버전) – 추후

---

## 2) Tech Stack (가정)

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- (선택) clsx / tailwind-merge
- (선택) lucide-react (아이콘)
- (선택) shadcn/ui (Accordion 등 UI 빠르게 구성)

---

## 3) Routing & Pages

### Routes
- `/` : Landing (wireframe 기반)
- `/docs` : Docs placeholder (Ref B 느낌의 문서 UX를 염두에 둔 stub)
- `/docs/[...slug]` : (추후) 문서 라우팅 확장 대비 (지금은 최소 구현 가능)

---

## 4) Design Principles (Solid하게 개발하기 위한 기준)

### 4.1 컴포넌트 경계
- **Section 단위 컴포넌트**로 분리
- Section 내부는 “UI를 깨지지 않게 유지”하는 최소 단위로 더 쪼갠다 (Card, TimelineItem 등)

### 4.2 “콘텐츠 교체”를 전제로 설계
- 텍스트는 placeholder지만, **줄 수/길이가 달라져도 레이아웃이 무너지지 않게** 만든다
- 긴 문구, 다국어(한글/영문), 링크 길이, 주소(컨트랙트) 길이 등 edge-case를 고려

### 4.3 반응형 정책
- Desktop: 2~3 column grid
- Mobile: 1 column stacking + 충분한 padding/spacing
- Header: Desktop은 inline nav, Mobile은 hamburger drawer

### 4.4 스타일링 규칙
- Tailwind 유틸리티 중심
- 색상은 **grayscale + accent 1개 이하**
- 이미지/일러스트는 당장 넣지 않는다 → skeleton/placeholder block 사용

---

## 5) Landing Layout Spec (Wireframe 기준)

> 모든 섹션은 `<SectionShell id title subtitle>` 형태로 감싸고,
> header nav 앵커(`/ #membership` 등)로 스크롤 이동 가능해야 한다.

### 5.1 Header (Sticky)
**요구사항**
- sticky top
- Logo + Nav + CTA 2개
- Nav 항목: Overview / Membership / Token / Security / Roadmap / Community / FAQ / Docs
- Mobile: hamburger → 드로어

**동작**
- Overview~FAQ: `/#section-id` 앵커로 이동
- Docs: `/docs` 이동

---

### 5.2 Hero
**구성**
- Headline (H1 placeholder)
- Subtitle (1~2줄)
- CTA 2개
- 배경(선택): 단색/그라데이션 placeholder

---

### 5.3 What is RH (3 key points)
**구성**
- Section title + description
- 3 cards (icon placeholder + title + description)

---

### 5.4 How It Works (3 steps)
**구성**
- 3 step cards
- Desktop: 3 columns
- Mobile: stack

---

### 5.5 Membership Tiers
**구성**
- 3 tier cards
- 각각: tier name, short perks list, CTA placeholder
- “추천/강조” 티어 표시용 배지 자리(optional)

---

### 5.6 Token Info
**구성**
- Desktop: 2 columns
- Cards:
  - Contract address (monospace + copy 버튼 placeholder)
  - Supply / Allocation (table/blocks placeholder)
  - Chain / Explorer links (link list placeholder)

---

### 5.7 Security
**구성**
- 3 highlight cards:
  - Audit
  - Multisig
  - Risk/Disclosure

---

### 5.8 Roadmap Timeline
**구성**
- Vertical timeline
- Items: Phase label(Q1/Q2 etc), description, status placeholder

---

### 5.9 FAQ
**구성**
- Accordion (4~6 items)
- Q/A placeholder

---

### 5.10 Footer
**구성**
- Disclaimer text block (긴 문구 대비)
- Community links
- Copyright

---

## 6) Folder Structure (권장)

```
app/
  page.tsx
  docs/
    page.tsx
components/
  layout/
    Header.tsx
    Footer.tsx
    Container.tsx
  sections/
    Hero.tsx
    WhatIs.tsx
    HowItWorks.tsx
    MembershipTiers.tsx
    TokenInfo.tsx
    Security.tsx
    Roadmap.tsx
    FAQ.tsx
  ui/
    SectionShell.tsx
    Card.tsx
    Button.tsx
    Badge.tsx
    Accordion.tsx (or shadcn/ui)
lib/
  constants/
    nav.ts
  data/
    landing.mock.ts
```

---

## 7) Mock Data Rules (중요)

- `lib/data/landing.mock.ts`에 섹션별 더미 데이터를 모아둔다
- 컴포넌트는 **mock data를 props로 받는 형태**로 만들고,
  나중에 CMS로 바꿀 때 “데이터 소스만 교체”할 수 있게 한다.

예시(형태만):

```ts
export const landingMock = {
  hero: { headline: "Red-Horse", subtitle: "Placeholder subtitle...", ctas: [...] },
  whatIs: { items: [...] },
  faq: { items: [...] },
};
```

---

## 8) Coding Conventions (Solid하게)

- 각 섹션 컴포넌트는:
  - `export default function SectionName(props)` 형태
  - 내부에서 mock을 직접 import하지 말고 **부모에서 props로 주입** (테스트/교체 용이)
- 접근성:
  - 헤더 nav는 `<nav>`
  - 버튼/링크 구분 엄격
  - accordion은 keyboard 접근 가능해야 함
- 성능:
  - 이미지 도입 전이라도 구조는 `next/image`로 교체 가능하게
- 타입:
  - `types.ts`로 섹션 데이터 타입 선언 (optional)

---

## 9) Docs Placeholder Spec (/docs)

> 이번 단계에선 “문서 시스템”을 구현하지 않고,
> **Ref B(GitBook)** 처럼 보일 수 있는 최소 UI만 만든다.

### 구성(최소)
- 상단: Docs Title + (검색 input placeholder)
- 좌측: sidebar placeholder (tree 느낌)
- 우측: content placeholder (H1 + paragraph blocks)
- Mobile: sidebar는 drawer로

### 페이지 목적
- “Docs로 진입 가능한 구조”를 먼저 확보하고,
- 다음 단계에서 Nextra/Docusaurus/GitBook/자체 MDX 등 어떤 방식으로든 교체 가능하게.

---

## 10) Definition of Done (완료 기준)

- Landing `/`가 와이어프레임과 유사한 구조/리듬으로 렌더링된다
- Desktop/Mobile에서 깨지는 영역 없이 자연스럽다
- 모든 섹션이 독립 컴포넌트로 분리되어 있다
- 텍스트/데이터를 실제 값으로 바꿔도 레이아웃이 유지될 것 같은 구조다
- `/docs` placeholder가 존재하며 “docs 느낌”의 최소 UX가 있다

---


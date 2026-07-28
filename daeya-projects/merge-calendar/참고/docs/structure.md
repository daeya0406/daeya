# 프로토타입 구조

## 시작점

**`index.html`** — 플로우 맵 · 3분 리뷰 가이드 · 화면별 딥링크

## 화면 파일

| 파일 | 역할 | screen 파라미터 |
|------|------|-----------------|
| `create.html` | 주최자 · 회의 만들기 | `?screen=1~4` |
| `respond.html` | 참석자 · 일정 입력 | `?screen=0~4` |
| `merge.html` | 주최자 · 가능한 시간 | `?screen=1~6`, `?empty=1` |
| `components.html` | UI 컴포넌트 참고 | — |
| `overlays/view.html` | 토스트 · 바텀시트 데모 | `?toast=` / `?title=` |

## CSS

| 파일 | 용도 |
|------|------|
| `base.css` | 색 · 간격 · 타이포 토큰, 공통 레이아웃 |
| `flow-patterns.css` | create · respond · merge 공통 UI |
| `grid.css` | 타임그리드 칸 높이 |
| `ui.css` | 토스트 · 바텀시트 · 아이콘 |
| `hub.css` | index · components 페이지 |
| `docs.css` | 문서 뷰어 타이포 |

## JS

| 파일 | 용도 |
|------|------|
| `mock-data.js` | 히트맵 · 일정 겹쳐보기 mock 데이터 |
| `flow-nav.js` | 화면 history · 뒤로가기 · Backspace |
| `doc-viewer.js` | 마크다운 → HTML 문서 뷰어 |
| `respond.js` | 참석자 플로우 |
| `ui.js` | TossUI (toast · confirm) |
| `icons.js` | Lucide 아이콘 · 딥링크 헬퍼 |

## 문서

| 파일 | 내용 |
|------|------|
| `docs/index.html` | 설계 문서 허브 (요약) |
| `docs/view.html` | 마크다운 뷰어 (`?doc=problem` 등) |
| `problem.md` | 문제 정의 원문 |
| `process.md` | 7단계 설계 프로세스 |
| `decisions.md` | 설계 결정 · 의도적 미구현 |
| `heatmap-rules.md` | 히트맵 · 요일 블록 규칙 |
| `layout.md` | 4pt 그리드 · 간격 가이드 |
| `states.md` | 화면별 상태 정리 |
| `submit.md` | 제출 · 배포 가이드 |

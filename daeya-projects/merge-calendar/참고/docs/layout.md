# 레이아웃 · 간격 가이드

토스 TDS 톤을 참고한 **4pt 그리드** 기준입니다. 구현은 `css/base.css` 토큰을 따릅니다.

---

## 간격 (4의 배수)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--s-1` | 4px | 뱃지 내부, 아주 좁은 gap |
| `--s-2` | 8px | 제목↔보조, 카드 사이, 칩 gap |
| `--s-3` | 12px | 행 내부 gap |
| `--s-4` | 16px | 카드 padding, 콘텐츠 하단 |
| `--s-5` | 20px | (예비) |
| `--s-6` | 24px | **페이지 좌우**, 섹션 간, CTA inset |
| `--s-8` | 32px | 허브 섹션 등 |

**자주 쓰는 별칭**

| 별칭 | 값 |
|------|-----|
| `--page-x` | 24px — 화면 좌우 여백 |
| `--grid-cell-h` | 28px — 히트맵 · 겹쳐보기 칸 높이 |
| `--grid-cell-h-input` | 40px — 참석자 입력 칸 (터치) |
| `--grid-wrap-pad` | 8px — 그리드 카드 안쪽 여백 |
| `--card-pad` | 16px — 카드 안쪽 |
| `--card-gap` | 8px — 리스트 카드 사이 |
| `--section-gap` | 24px — 제목 블록 ↔ 본문 |

---

## 타이포

| 역할 | 클래스/요소 | 크기 | 굵기 | 색 |
|------|-------------|------|------|-----|
| 화면 제목 | `h2` | 22px | 700 | grey-900 |
| 네비 제목 | `.nav h1` | 17px | 600 | grey-900 |
| 강조 메타 | `.screen-meta` | 15px | 600 | blue |
| 보조 설명 | `.sub` | 15px | 400 | grey-700 |
| 카드 라벨 | `.card h3` | 13px | 400 | grey-500 |
| 리스트 이름 | `.member-name` | 17px | 600 | grey-900 |
| 대기 이름 | `.member-name.is-pending` | 17px | 500 | grey-500 |
| 뱃지 | `.badge` | 11px | 600 | — |

---

## 화면 구조 (콘텐츠 가이드)

```
[status 44px]
[nav 56px]
[progress-bar]  ← create만
.content (padding: 8px 24px 16px)
  .screen-head
    h2                    ← 8px ↓
    .screen-meta          ← 8px ↓
    .sub                  ← 24px ↓ (리스트)
  .member-list | .card…
[cta fixed bottom 24px]
```

### screen-head

제목 + 상태 + 한 줄 설명을 묶습니다. `.sub`의 `margin-bottom`은 head 안에서는 0.

### member-list

참석자·입력 현황 등 **동일 카드 반복** 리스트. `gap: 8px`, 카드 `margin-bottom` 없음.

### 카드

- radius `16px`, padding `16px`
- 필드 카드(`.field-card`)는 동일 패딩

---

## 컴포넌트별

| 패턴 | 파일 | 비고 |
|------|------|------|
| 회의 만들기 progress | create | `progress-bar`는 단계용만 |
| 입력 현황 | merge screen 1 | progress 없음 · `screen-meta`만 |
| 히트맵 | merge screen 2 | `screen-head` + `bar-tabs` + `grid-wrap` |
| 참석자 그리드 | respond | `grid-wrap` padding 12px |

---

## 적용 현황

| 화면 | 적용 |
|------|------|
| merge · 입력 현황 | ✅ 기준 화면 |
| merge · 히트맵 등 | base 토큰 상속 (점진) |
| create · respond | base 토큰 상속, 인라인 스타일 정리 예정 |
| components.html | Layout 섹션 참고 |

새 화면은 **인라인 margin** 대신 `screen-head` / `member-list` / 토큰을 사용하세요.

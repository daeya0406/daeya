# 제출 · 배포 가이드

심사자가 **한 링크만** 받아도 3분 안에 핵심을 볼 수 있게 정리하는 방법입니다.

---

## 1. 제출 폼에 넣을 것

**파일을 하나씩 올리지 않습니다.** 폴더 전체를 배포한 뒤 **URL 하나**만 제출합니다.

| 제출 칸 | 넣을 내용 |
|---------|-----------|
| **프로토타입 링크** | `https://YOUR-DOMAIN/` (또는 `/index.html`) |
| **문항 1~3** | `제출문항.md` 상단 3개 답변을 **텍스트로 복사** (md 링크 X) |
| **한 줄 메모** (선택) | 「index.html 3분 리뷰 가이드부터 봐주세요」 |

심사자는 파일 트리를 보지 않습니다. `index.html` 허브 → 프로토타입 클릭 흐름만 따라갑니다.

### .md 파일은?

| 누가 | 어떻게 |
|------|--------|
| **심사자** | `docs/index.html` 요약 · `docs/view.html?doc=...` 전문 |
| **본인** | `docs/*.md` 편집용 · 제출 답변은 폼에 직접 붙여넣기 |

### 링크 (1개면 충분)

```
https://YOUR-DOMAIN/index.html
```

또는 루트가 `index.html`이면:

```
https://YOUR-DOMAIN/
```

**보조 링크** (폼에 여러 칸이 있을 때만):

| 라벨 | URL |
|------|-----|
| UI Components | `.../components.html` |
| 차별점 (일정 겹쳐보기) | `.../merge.html?screen=6` |

### 텍스트 답변

`제출문항.md` 상단 3개 문항을 **그대로 복사**해 붙여넣기.

---

## 2. 심사자가 보는 순서 (index가 안내)

`index.html` 상단 **「3분 리뷰」** 카드가 진입점입니다.

```
문제 정의 → 컴포넌트 → create → respond → merge 히트맵 → 일정 겹쳐보기 → 설계 결정
```

심사자는 파일 트리를 몰라도 됩니다. **허브 하나**만 주면 됩니다.

---

## 3. 배포 방법

### A. GitHub Pages (추천)

1. GitHub에 `toss-challenge` 폴더 전체 push
2. Repo → **Settings → Pages**
3. Source: `main` 브랜치, 폴더 `/ (root)` 또는 `/docs`가 아닌 **프로젝트 루트**
4. 배포 URL 예: `https://USERNAME.github.io/REPO-NAME/`

> 폴더 전체를 repo 루트에 올려야 `css/`, `js/`, `docs/` 경로가 깨지지 않습니다.

### B. Vercel / Netlify

1. 폴더를 드래그 앤 드롭 또는 Git 연결
2. Build command: 없음 (정적 HTML)
3. Output directory: `.` (루트)

### C. ZIP 업로드 (폼이 파일만 받을 때)

`toss-challenge/` 폴더 **전체**를 zip. `index.html`이 zip 최상단에 있어야 합니다.

---

## 4. 배포 전 체크리스트

- [ ] `index.html`이 루트에 있고, 상단 「3분 리뷰」가 보인다
- [ ] `create.html` → `respond.html` → `merge.html?screen=2` 클릭 흐름이 동작한다
- [ ] `merge.html?screen=6` 일정 겹쳐보기에서 이름 토글이 된다
- [ ] `components.html`이 열린다
- [ ] 모바일 뷰(375px)에서 phone 프레임이 자연스럽다
- [ ] `제출문항.md`에 배포 URL을 채웠다

---

## 5. 두서없어 보이지 않게 하는 원칙

| 하지 말 것 | 대신 |
|-----------|------|
| `create.html`만 링크 | `index.html` (허브) |
| 파일 목록을 폼에 붙여넣기 | README / structure.md는 repo용 |
| docs 6개를 각각 링크 | index의 3분 가이드 1개 |
| Figma + 웹 둘 다 반쯤 | 웹 프로토타입 하나에 집중 |

---

## 6. 제출 후 한 줄 설명 (선택)

폼에 짧은 메모 칸이 있으면:

> 「일정 맞추기」— 6명 일정을 한 타임테이블에 겹쳐 보는 회의 조율 프로토타입입니다.  
> **index.html**의 3분 리뷰 가이드를 따라가시면 전체 플로우를 확인하실 수 있습니다.

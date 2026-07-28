const MEETING = {
  title: '팀 킥오프 미팅',
  attendees: [
    { name: '김다연', required: true, host: true },
    { name: '김민수', required: true },
    { name: '이지영', required: true },
    { name: '박현우', required: false },
    { name: '최수진', required: false },
    { name: '정태호', required: false },
  ],
};

const days = ['월', '화', '수', '목', '금'];
const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
let mode = 'unavail';
let inputWeek = 1;
let dayWeek = 1;
let currentUser = null;

const SUBMITTED_KEY = 'toss-challenge-submitted';

function getSubmittedNames() {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(SUBMITTED_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function markSubmitted(name) {
  const set = getSubmittedNames();
  set.add(name);
  sessionStorage.setItem(SUBMITTED_KEY, JSON.stringify([...set]));
}

function hasSubmitted(name) {
  return getSubmittedNames().has(name);
}

const weekDays = {
  1: [
    { label: '월 7/7', blocked: false },
    { label: '화 7/8', blocked: true },
    { label: '수 7/9', blocked: false },
    { label: '목 7/10', blocked: false },
    { label: '금 7/11', blocked: true },
  ],
  2: [
    { label: '월 7/14', blocked: false },
    { label: '화 7/15', blocked: false },
    { label: '수 7/16', blocked: true },
    { label: '목 7/17', blocked: false },
    { label: '금 7/18', blocked: false },
  ],
};

function showScreen(n) {
  const target = document.querySelector(`[data-screen="${n}"]`);
  if (!target) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  target.classList.add('active');
  if (n === 2) {
    buildGrid(document.getElementById('input-grid'), true, inputWeek);
  }
}

const nav = FlowNav.wrap(showScreen, { defaultScreen: 0 });
const go = nav.go;

function getBlockedCols(week) {
  return weekDays[week].map((d, i) => (d.blocked ? i : -1)).filter(i => i >= 0);
}

function bindWeekTabs(group, onChange) {
  document.querySelectorAll(`[data-week-tabs="${group}"] .bar-tab`).forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(`[data-week-tabs="${group}"] .bar-tab`).forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      onChange(Number(tab.dataset.week));
    };
  });
}

function renderDayList() {
  const el = document.getElementById('day-list');
  el.innerHTML = weekDays[dayWeek].map((d, i) => {
    const status = d.blocked
      ? `<span class="day-row-status">${LucideIcons.svg('x', { size: 14, strokeWidth: 2.5 })} 전체 불가</span>`
      : '<span class="day-row-hint">탭하여 설정</span>';
    return `
    <button type="button" class="day-row${d.blocked ? ' blocked' : ''}" data-day-idx="${i}">
      <span>${d.label}</span>
      <span>${status}</span>
    </button>
  `;
  }).join('');
  el.querySelectorAll('.day-row').forEach(row => {
    row.onclick = () => {
      const idx = Number(row.dataset.dayIdx);
      weekDays[dayWeek][idx].blocked = !weekDays[dayWeek][idx].blocked;
      renderDayList();
    };
  });
}

function paintCell(cell) {
  if (cell.classList.contains('blocked')) return;
  cell.classList.remove('unavail', 'pref');
  cell.classList.add(mode === 'unavail' ? 'unavail' : 'pref');
}

function bindGridPaint(gridEl) {
  let painting = false;

  function cellFromEvent(e) {
    if (e.touches && e.touches.length) {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const cell = el?.closest?.('.cell');
      return cell && gridEl.contains(cell) ? cell : null;
    }
    const t = e.target.closest('.cell');
    return t && gridEl.contains(t) ? t : null;
  }

  function start(e) {
    const cell = cellFromEvent(e);
    if (!cell) return;
    painting = true;
    paintCell(cell);
  }

  function move(e) {
    if (!painting) return;
    const cell = cellFromEvent(e);
    if (cell) paintCell(cell);
  }

  function stop() { painting = false; }

  gridEl.addEventListener('mousedown', start);
  gridEl.addEventListener('mousemove', move);
  window.addEventListener('mouseup', stop);
  gridEl.addEventListener('touchstart', start, { passive: false });
  gridEl.addEventListener('touchmove', e => { e.preventDefault(); move(e); }, { passive: false });
  window.addEventListener('touchend', stop);
}

function buildGrid(el, interactive, week) {
  const blockedCols = getBlockedCols(week);
  if (interactive) el.classList.add('input-grid');
  el.innerHTML = '<div></div>' + days.map(d => `<div class="day">${d}</div>`).join('');
  hours.forEach(h => {
    el.innerHTML += `<div class="hour">${h}</div>`;
    days.forEach((d, di) => {
      const blocked = blockedCols.includes(di);
      el.innerHTML += `<div class="cell${blocked ? ' blocked' : ''}" data-d="${di}" data-h="${h}"></div>`;
    });
  });
  if (interactive) bindGridPaint(el);
}

document.getElementById('mode-unavail').onclick = () => { mode = 'unavail'; setMode(); };
document.getElementById('mode-pref').onclick = () => { mode = 'pref'; setMode(); };
function setMode() {
  document.getElementById('mode-unavail').classList.toggle('inactive', mode !== 'unavail');
  document.getElementById('mode-pref').classList.toggle('inactive', mode !== 'pref');
}

bindWeekTabs('input', w => { inputWeek = w; buildGrid(document.getElementById('input-grid'), true, w); });
bindWeekTabs('day', w => { dayWeek = w; renderDayList(); });

const nameInput = document.getElementById('attendee-name');
const nameSubmit = document.getElementById('name-submit');
const nameError = document.getElementById('name-error');
const nameFieldCard = nameInput.closest('.field-card');

function findAttendee(name) {
  return MEETING.attendees.find(a => a.name === name.trim()) || null;
}

function validateNameInput() {
  const match = findAttendee(nameInput.value);
  const showError = !match && !!nameInput.value.trim();
  nameError.hidden = !showError;
  nameFieldCard.classList.toggle('is-error', showError);
  nameSubmit.disabled = !match;
  return match;
}

nameInput.addEventListener('input', validateNameInput);
nameSubmit.onclick = () => {
  const match = findAttendee(nameInput.value);
  if (!match) {
    nameError.hidden = false;
    nameFieldCard.classList.add('is-error');
    nameSubmit.disabled = true;
    return;
  }
  currentUser = match;
  go(hasSubmitted(match.name) ? 1 : 3);
};

document.getElementById('keep-submission-btn').onclick = () => go(4);
document.getElementById('edit-submission-btn').onclick = () => go(3);
document.getElementById('edit-from-done-btn').onclick = () => go(3);
document.getElementById('meeting-title-sub').textContent = MEETING.title;

document.getElementById('input-complete-btn').onclick = async () => {
  const resubmit = currentUser && hasSubmitted(currentUser.name);
  const ok = await TossUI.confirm({
    title: resubmit ? '이전 입력을\n덮어쓸까요?' : '이대로 입력을\n완료할까요?',
    message: resubmit
      ? '새로 입력한 내용으로 바뀌어요. 회의 확정 전까지 다시 수정할 수 있어요.'
      : '회의가 확정되기 전까지 다시 수정할 수 있어요.',
    confirmText: resubmit ? '덮어쓰기' : '완료하기',
    cancelText: '더 수정할게요',
  });
  if (ok) {
    if (currentUser) markSubmitted(currentUser.name);
    TossUI.toast(resubmit ? '일정을 수정했어요' : '일정 입력을 완료했어요', { type: 'success' });
    go(4);
  }
};

buildGrid(document.getElementById('input-grid'), true, 1);
renderDayList();
nav.init();
initLucideIcons();

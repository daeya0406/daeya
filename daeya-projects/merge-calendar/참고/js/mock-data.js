/**
 * 일정 맞추기 프로토타입 — 공통 mock 데이터
 * merge 히트맵 · 일정 겹쳐보기에서 공유
 */
const ScheduleMock = (() => {
  const DAYS = ['월', '화', '수', '목', '금'];
  const HOURS = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];

  const MEETING = {
    name: '팀 킥오프 미팅',
    submittedCount: 4,
    totalCount: 6,
  };

  /** @type {{ id: string, name: string, required: boolean, pending: boolean }[]} */
  const MEMBERS = [
    { id: 'minsu', name: '김민수', required: true, pending: false },
    { id: 'jiyoung', name: '이지영', required: true, pending: false },
    { id: 'hyunwoo', name: '박현우', required: false, pending: false },
    { id: 'sujin', name: '최수진', required: false, pending: false },
    { id: 'taeho', name: '정태호', required: false, pending: true },
    { id: 'daeyeon', name: '김다연', required: true, pending: true },
  ];

  /**
   * 참석자별 요일 전체 불가 (attendee 3단계)
   * dayIndex: 월0 … 금4
   * — 필수 인원이 막은 요일만 히트맵 열 전체 회색
   * — 선택 인원은 해당 인원 슬롯만 unavail (열은 후보 유지)
   */
  const MEMBER_DAY_BLOCKED = {
    1: {
      minsu: [1, 4],   // 화·금 — 필수(김민수) 외근
      sujin: [0],      // 월 — 선택(최수진) 외근 · 열 회색 아님
    },
    2: {
      jiyoung: [2],    // 수 — 필수(이지영)
      hyunwoo: [0],    // 월 — 선택(박현우)
    },
  };

  /**
   * 슬롯 상태: ok | pref | unavail
   * key = `${hour}-${dayIndex}`  (dayIndex: 월0 … 금4)
   */
  const SLOTS = {
    1: {
      minsu: {
        '9-2': 'pref',
        '10-0': 'unavail', '11-0': 'unavail',
        '12-0': 'pref', '12-2': 'pref',
        '11-2': 'unavail',
        '13-3': 'unavail',
        '15-0': 'unavail',
        '15-3': 'unavail',
        '16-3': 'unavail', '17-3': 'unavail',
        '17-0': 'unavail',
      },
      jiyoung: {
        '13-0': 'pref', '13-2': 'pref', '13-3': 'pref',
        '14-0': 'pref',
        '15-2': 'unavail',
        '15-3': 'unavail',
        '16-0': 'pref', '16-2': 'unavail',
        '11-3': 'unavail',
      },
      hyunwoo: {
        '10-2': 'pref', '11-2': 'pref',
        '14-3': 'unavail', '15-3': 'unavail', '16-3': 'unavail', '17-3': 'unavail',
        '17-0': 'unavail',
      },
      sujin: {
        '11-2': 'unavail',
        '12-3': 'unavail',
        '13-3': 'unavail',
        '14-0': 'unavail', '15-0': 'unavail',
        '15-3': 'unavail',
        '10-3': 'pref',
        '17-0': 'pref',
        '16-2': 'unavail',
      },
      taeho: {
        '11-0': 'unavail', '12-0': 'unavail',
        '14-2': 'pref',
        '15-3': 'unavail', '16-3': 'unavail',
      },
      daeyeon: {
        '9-0': 'unavail',
        '10-0': 'unavail', '11-0': 'unavail',
        '17-0': 'unavail',
      },
    },
    2: {
      minsu: {
        '10-1': 'unavail', '11-1': 'unavail',
        '12-1': 'unavail', '12-4': 'pref',
        '14-0': 'unavail',
        '16-0': 'unavail', '17-0': 'unavail',
        '13-1': 'unavail',
      },
      jiyoung: {
        '12-1': 'unavail',
        '13-1': 'pref', '13-4': 'pref',
        '14-0': 'unavail', '14-1': 'pref',
        '11-0': 'unavail',
        '15-0': 'pref',
        '15-4': 'unavail',
        '16-1': 'unavail',
      },
      hyunwoo: {
        '10-0': 'pref',
        '12-1': 'unavail',
        '13-1': 'unavail',
        '14-4': 'unavail', '15-4': 'unavail', '16-4': 'unavail',
      },
      sujin: {
        '11-0': 'unavail',
        '12-0': 'unavail',
        '12-1': 'unavail',
        '11-4': 'unavail',
        '13-3': 'unavail',
        '16-1': 'pref',
        '15-1': 'unavail',
        '17-1': 'unavail',
      },
      taeho: {
        '10-4': 'unavail',
        '14-1': 'unavail',
        '11-1': 'pref',
      },
      daeyeon: {
        '10-1': 'unavail',
      },
    },
  };

  const LAYER_FILL = {
    brand: '49, 130, 246',
    yellow: '255, 220, 100',
    red: '240, 68, 82',
    base: '209, 214, 219',
  };

  const LAYER_DENSITY_STEP = 0.2;

  function computeLayerCell(activeIds, week, key) {
    const [, di] = key.split('-').map(Number);
    if (getBlockedCols(week).includes(di)) {
      return { background: `rgba(${LAYER_FILL.base}, 0.55)`, okCount: 0, allClear: false };
    }

    let okCount = 0;
    let prefCount = 0;
    let unavailCount = 0;

    activeIds.forEach(id => {
      const st = getSlotStatus(id, week, key);
      if (st === 'ok') okCount += 1;
      else if (st === 'pref') prefCount += 1;
      else if (st === 'unavail') unavailCount += 1;
    });

    const base = `linear-gradient(rgba(${LAYER_FILL.base}, 0.22), rgba(${LAYER_FILL.base}, 0.22))`;
    let tint = null;

    if (unavailCount > 0) {
      const a = unavailCount * LAYER_DENSITY_STEP;
      tint = `linear-gradient(rgba(${LAYER_FILL.red}, ${a}), rgba(${LAYER_FILL.red}, ${a}))`;
    } else if (prefCount > 0) {
      const a = prefCount * LAYER_DENSITY_STEP;
      tint = `linear-gradient(rgba(${LAYER_FILL.yellow}, ${a}), rgba(${LAYER_FILL.yellow}, ${a}))`;
    } else if (okCount > 0) {
      const a = okCount * LAYER_DENSITY_STEP;
      tint = `linear-gradient(rgba(${LAYER_FILL.brand}, ${a}), rgba(${LAYER_FILL.brand}, ${a}))`;
    }

    const allClear = activeIds.length > 0
      && activeIds.every(id => getSlotStatus(id, week, key) === 'ok');

    return {
      background: tint ? `${tint}, ${base}` : base,
      okCount,
      prefCount,
      unavailCount,
      allClear,
    };
  }

  const DEFAULT_LAYER_ACTIVE = ['minsu', 'jiyoung', 'hyunwoo', 'sujin'];
  const HEAT_MIN_OK = 3;

  function getMemberDayBlocked(memberId, week) {
    return MEMBER_DAY_BLOCKED[week]?.[memberId] || [];
  }

  /** 필수 제출자가 요일 전체 불가한 열 — 히트맵 열 회색 */
  function getBlockedCols(week) {
    const cols = new Set();
    const map = MEMBER_DAY_BLOCKED[week] || {};
    Object.entries(map).forEach(([memberId, dayIndices]) => {
      const m = getMember(memberId);
      if (!m || m.pending || !m.required) return;
      dayIndices.forEach((di) => cols.add(di));
    });
    return [...cols];
  }

  function isMemberDayBlocked(memberId, week, dayIndex) {
    return getMemberDayBlocked(memberId, week).includes(dayIndex);
  }

  function getMember(id) {
    return MEMBERS.find(m => m.id === id);
  }

  function getSlotStatus(memberId, week, key) {
    const [, di] = key.split('-').map(Number);
    if (isMemberDayBlocked(memberId, week, di)) return 'unavail';
    if (getBlockedCols(week).includes(di)) return 'blocked';
    return SLOTS[week]?.[memberId]?.[key] || 'ok';
  }

  function slotLabel(key) {
    const [h, di] = key.split('-').map(Number);
    return `${DAYS[di]} ${h}:00`;
  }

  function submittedMembers() {
    return MEMBERS.filter(m => !m.pending);
  }

  function slotIssues(memberIds, week, key) {
    return memberIds
      .map(id => {
        const st = getSlotStatus(id, week, key);
        if (st !== 'pref' && st !== 'unavail') return null;
        const m = getMember(id);
        return { name: m.name, status: st, required: m.required };
      })
      .filter(Boolean);
  }

  function countOkAmong(memberIds, week, key) {
    const blocked = getBlockedCols(week);
    const [, di] = key.split('-').map(Number);
    if (blocked.includes(di)) return 0;
    return memberIds.filter(id => getSlotStatus(id, week, key) === 'ok').length;
  }

  function heatDisplayPills(memberIds, week, key) {
    const issues = slotIssues(memberIds, week, key);
    const unavails = issues.filter(p => p.status === 'unavail');
    const prefs = issues.filter(p => p.status === 'pref');

    if (unavails.length > 0 && prefs.length > 0) return [];
    if (prefs.length > 0) return prefs.length <= 2 ? prefs : [];
    if (unavails.length > 0) {
      if (unavails.some(p => p.required)) return [];
      return unavails.slice(0, 1);
    }
    return [];
  }

  function classifyHeatSlot(memberIds, week, key) {
    const [, di] = key.split('-').map(Number);
    if (getBlockedCols(week).includes(di)) {
      return { type: 'blocked', rank: 0, pills: [] };
    }

    const okCount = countOkAmong(memberIds, week, key);
    if (okCount < HEAT_MIN_OK) {
      return { type: 'impossible', rank: 0, pills: [] };
    }

    const hasRequiredUnavail = memberIds.some(id => {
      const m = getMember(id);
      return m.required && getSlotStatus(id, week, key) === 'unavail';
    });
    if (hasRequiredUnavail) {
      return { type: 'impossible', rank: 0, pills: [] };
    }

    if (okCount === memberIds.length) {
      return { type: 'best', rank: 1, pills: [] };
    }

    const pills = heatDisplayPills(memberIds, week, key);
    const issues = slotIssues(memberIds, week, key);
    let rank = 2;
    if (pills.some(p => p.required && p.status === 'pref')) rank = 3;
    else if (!pills.length && issues.length > 0) rank = 3;

    return { type: 'coord', rank, pills };
  }

  function buildHeatData(empty = false) {
    if (empty) {
      return { cells: { 1: {}, 2: {} }, pills: { 1: {}, 2: {} } };
    }

    const cells = { 1: {}, 2: {} };
    const pills = { 1: {}, 2: {} };
    const submitted = submittedMembers().map(m => m.id);

    [1, 2].forEach(week => {
      HOURS.forEach(h => {
        DAYS.forEach((_, di) => {
          const key = `${h}-${di}`;
          const result = classifyHeatSlot(submitted, week, key);
          if (result.type === 'blocked') return;
          if (result.type === 'impossible') {
            cells[week][key] = { type: 'impossible', rank: 0 };
            return;
          }
          cells[week][key] = { type: result.type, rank: result.rank };
          if (result.pills.length) pills[week][key] = result.pills;
        });
      });
    });

    return { cells, pills };
  }

  function findBestAllOkSlot(memberIds, week) {
    const blocked = getBlockedCols(week);
    let bestKey = null;

    HOURS.forEach(h => {
      DAYS.forEach((_, di) => {
        if (blocked.includes(di)) return;
        const key = `${h}-${di}`;
        const allOk = memberIds.length > 0
          && memberIds.every(id => getSlotStatus(id, week, key) === 'ok');
        if (allOk && !bestKey) bestKey = key;
      });
    });

    return bestKey;
  }

  function allBestSlots() {
    const submitted = submittedMembers().map(m => m.id);
    const out = [];
    [1, 2].forEach(week => {
      HOURS.forEach(h => {
        DAYS.forEach((_, di) => {
          if (getBlockedCols(week).includes(di)) return;
          const key = `${h}-${di}`;
          if (submitted.every(id => getSlotStatus(id, week, key) === 'ok')) {
            out.push({ week, key, label: slotLabel(key) });
          }
        });
      });
    });
    return out;
  }

  return {
    DAYS,
    HOURS,
    MEETING,
    MEMBERS,
    MEMBER_DAY_BLOCKED,
    SLOTS,
    LAYER_FILL,
    LAYER_DENSITY_STEP,
    DEFAULT_LAYER_ACTIVE,
    computeLayerCell,
    getBlockedCols,
    getMember,
    getSlotStatus,
    slotLabel,
    submittedMembers,
    buildHeatData,
    classifyHeatSlot,
    countOkAmong,
    findBestAllOkSlot,
    allBestSlots,
    HEAT_MIN_OK,
  };
})();

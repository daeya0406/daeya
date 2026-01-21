export type CareerEntry = {
  period: string;
  client: string;
  project: string;
  role?: string;
  summary?: string;
  highlights?: string[];
  skills?: string[];
};

export type CareerYear = {
  year: string;
  entries: CareerEntry[];
};

export const CAREER_TIMELINE: CareerYear[] = [
  {
    year: '2025',
    entries: [
      {
        period: '2025.07 ~ 2026.01',
        client: '코드잇 스프린트 프론트엔드 19기',
        project: '프론트엔드 개발 과정',
      },
      {
        period: '2025.02 ~ 2026.06',
        client: '아정당 FE팀',
        project: '홈페이지 리뉴얼 및 확장 플랫폼들 퍼블리싱',
      },
    ],
  },
  {
    year: '2024',
    entries: [
      { period: '2024.12 ~ 2024.12', client: '법률구조공단', project: '기관정보관리' },
      { period: '2024.12 ~ 2024.12', client: '토이프로젝트', project: '부꾸러미 어플리케이션' },
      { period: '2024.12 ~ 2024.12', client: '울산도시공사', project: '제안 기획' },
      { period: '2024.11 ~ 2024.11', client: '한전원자력연료', project: '종료보고' },
      { period: '2024.07 ~ 2024.09', client: '마키나락스', project: 'Annotation Tool' },
      { period: '2024.02 ~ 2024.05', client: '안전보건공단', project: '위험성평가시스템(KRAS)' },
      { period: '2024.01 ~ 2024.01', client: '자사', project: '사내그룹웨어' },
    ],
  },
  {
    year: '2023',
    entries: [
      { period: '2023.07 ~ 2023.12', client: '한전원자력연료', project: 'MES' },
      { period: '2023.03 ~ 2023.04', client: '산업인력공단', project: '한국어능력시험 CBT' },
      { period: '2022.12 ~ 2023.02', client: '산업인력공단', project: 'TODO: 프로젝트명' },
    ],
  },
  {
    year: '2022',
    entries: [
      { period: '2022.10 ~ 2022.12', client: '한국안심일터기술원', project: '홈페이지' },
      {
        period: '2022.08 ~ 2022.09',
        client: '안전보건공단',
        project: '유해위험기계기구 종합정보시스템(MIIS)',
      },
      { period: '2022.06 ~ 2022.08', client: 'SKC', project: 'SKYME 설비관리시스템' },
      { period: '2022.02 ~ 2022.06', client: '안전보건공단', project: '교육원 홈페이지' },
      { period: '2022.01 ~ 2022.01', client: '근로복지공단', project: '홈페이지 유지보수' },
    ],
  },
  {
    year: '2021',
    entries: [
      {
        period: '2021.12 ~ 2021.12',
        client: '현대로보틱스',
        project: 'CES 국제전자제품박람회 키오스크',
      },
      { period: '2021.11 ~ 2021.12', client: '국립재난안전연구원', project: '웹포탈시스템' },
      { period: '2021.07 ~ 2022.12', client: '울산감염병관리지원단', project: '홈페이지 유지보수' },
      { period: '2021.09 ~ 2021.10', client: '자화전자', project: 'SPC 공정관리시스템' },
      { period: '2021.08 ~ 2021.10', client: '일자리안정자금', project: '홈페이지' },
      { period: '2021.07 ~ 2021.08', client: '울산과학대학', project: '실시간 모니터링 시스템' },
      { period: '2021.07 ~ 2021.07', client: '동서발전', project: '실시간 모니터링 시스템' },
      { period: '2021.04 ~ 2021.06', client: 'S-OIL', project: '웹포탈시스템' },
      { period: '2021.01 ~ 2021.06', client: 'HK.InnoN', project: 'PIMS 시스템' },
      { period: '2021.02 ~ 2021.04', client: '풀무원', project: '디지털팩토리' },
      { period: '2021.01 ~ 2021.01', client: '동서발전', project: '모니터링 화면' },
    ],
  },
];

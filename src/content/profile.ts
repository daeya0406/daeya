import { profileSchema, type Profile } from './schema';

export const PROFILE = {
  name: '김정대',
  nickname: 'Daeya',
  role: 'Frontend Developer',
  email: 'daeya0406@gmail.com',
  links: {
    github: 'https://github.com/daeya0406',
    resume: '/resume.pdf',
    publishingPortfolio: '/publishing/index.html',
    pdChallenge: 'https://daeya0406.github.io/2026-toss-pd-challenge/index.html',
    playgroundOrg: 'https://github.com/orgs/daeya-playground/',
  },
  career: {
    total: {
      id: 'experience',
      label: '총 경력',
      description: '퍼블리싱 5년+',
      fallback: '0',
    },
    frontend: {
      id: 'projects',
      label: '프론트엔드 프로젝트',
      description: '프론트엔드',
      value: '전환 중',
    },
    publishing: {
      id: 'study',
      label: '퍼블리싱 프로젝트',
      description: '퍼블리싱',
      value: '50+',
    },
  },
} satisfies Profile;

profileSchema.parse(PROFILE);

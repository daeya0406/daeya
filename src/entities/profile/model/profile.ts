export const PROFILE = {
  name: '김정대',
  nickname: 'Daeya',
  role: 'Frontend Developer',
  email: 'daeya0406@gmail.com',
  links: {
    github: 'https://github.com/',
    resume: '/resume.pdf',
  },
  career: {
    total: {
      id: 'experience',
      label: '총 경력',
      description: '프론트엔드 기준 0, (퍼블리싱 5년+)',
      fallback: '0',
    },
    frontend: {
      id: 'projects',
      label: '프론트엔드 프로젝트',
      description: '프론트엔드',
      value: '4',
    },
    publishing: { id: 'study', label: '퍼블리싱 프로젝트', description: '퍼블리싱', value: '50+' },
  },
};

import TypeNarrowingDemo from '../examples/ts/TypeNarrowingDemo';
import { InfoBlock } from '../examples/InfoBlock';
import type { PlaygroundItem } from '@/types/playground';

export const tsItems: PlaygroundItem[] = [
  {
    id: 'type-narrowing',
    title: '유니온 + 타입 좁히기',
    tags: ['Narrowing'],
    description: 'discriminated union으로 안전하게 분기',
    categories: ['ts'],
    demo: <TypeNarrowingDemo />,
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'square'; size: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'rect': return shape.width * shape.height;
    case 'square': return shape.size ** 2;
  }
}`,
  },
  {
    id: 'generics',
    title: '제네릭 실전',
    tags: ['Generics'],
    description: '재사용 가능한 함수/컴포넌트 타입',
    categories: ['ts'],
    demo: (
      <InfoBlock
        title="제네릭 활용"
        points={[
          '함수 반환 타입을 입력에 맞춰 추론',
          '제약 조건 extends로 안전하게 제한',
          'default 제네릭으로 편의 제공',
        ]}
      />
    ),
    code: `function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const entries = keys.map((k) => [k, obj[k]]);
  return Object.fromEntries(entries) as Pick<T, K>;
}`,
  },
  {
    id: 'keyof-mapping',
    title: 'keyof',
    tags: ['keyof'],
    description: '객체 키를 타입으로 추출(안전한 분기/레코드 구성)',
    categories: ['ts'],
    demo: (
      <InfoBlock
        title="keyof 포인트"
        points={[
          '객체 리터럴의 키를 union 타입으로 추출',
          'Record<keyof typeof obj, ...>로 누락 없이 맵핑',
          '함수 인자를 keyof 타입으로 제한해 오타 방지',
        ]}
      />
    ),
    code: `const scenarios = {
  nullable: { name: 'Daeya' },
  emptyString: { name: '' },
  full: { name: 'Jeongdae' },
};

type Scene = keyof typeof scenarios; // 'nullable' | 'emptyString' | 'full'

const labels: Record<Scene, string> = {
  nullable: 'null/undefined',
  emptyString: '빈 문자열',
  full: '값 존재',
};

function getUser(scene: Scene) {
  return scenarios[scene];
}`,
  },
  {
    id: 'typeof-inference',
    title: 'typeof',
    tags: ['typeof'],
    description: '값에서 타입 추출(런타임 값 모양을 타입으로 재사용)',
    categories: ['ts'],
    demo: (
      <InfoBlock
        title="typeof 포인트"
        points={[
          '초기 값(리터럴)에서 타입 선언 없이 추론',
          'API 응답/설정 객체 타입을 typeof로 공유',
          '헬퍼가 반환한 객체에 typeof 적용해 중복 선언 제거',
        ]}
      />
    ),
    code: `const config = {
  endpoint: '/users',
  retries: 3,
  headers: { Accept: 'application/json' },
};

type Config = typeof config;

function fetchUsers(cfg: Config) {
  return fetch(cfg.endpoint, { headers: cfg.headers });
}

const response = { data: [{ id: 1, name: 'Daeya' }] };
type Response = typeof response; // { data: { id: number; name: string }[] }`,
  },
  {
    id: 'utility-types',
    title: '유틸리티 타입 사용처',
    tags: ['Utility'],
    description: 'Partial/Pick/Record 등 활용',
    categories: ['ts'],
    demo: (
      <InfoBlock
        title="유틸리티 타입"
        points={[
          'Partial<T>: 일부 속성만 선택적으로',
          'Pick/Omit: 필요한 필드만 추출/제외',
          'Record<K,V>: key/value 맵 선언',
        ]}
      />
    ),
    code: `type Draft<T> = Partial<T>;
type UserPreview = Pick<User, 'id' | 'name'>;
type StatusMap = Record<'idle'|'loading'|'error', boolean>;`,
  },
  {
    id: 'polymorphic',
    title: '폴리모픽 컴포넌트',
    tags: ['Polymorphic'],
    description: 'as prop으로 태그 전환',
    categories: ['ts'],
    demo: (
      <InfoBlock
        title="Polymorphic as"
        points={[
          '기본 태그 + as="a"/"button" 등으로 변경',
          'ref/props 타입 안전하게 전달',
          'UI 라이브러리에서 재사용성↑',
        ]}
      />
    ),
    code: `<PolymorphicBox as="span" className="text-xs">내용</PolymorphicBox>`,
  },
  {
    id: 'api-types',
    title: 'API Response 타입 아키텍처',
    tags: ['API'],
    description: '클라이언트/서버 공용 타입 관리',
    categories: ['ts'],
    demo: (
      <InfoBlock
        title="API 타입 관리"
        points={[
          '공용 타입 모듈 정의 후 fetch 결과에 사용',
          '서버 validation 스키마(Zod) → infer로 타입 공유',
          '에러/페이징 등 공통 envelope 타입화',
        ]}
      />
    ),
    code: `type ApiResponse<T> = { data: T; error?: string };
const res: ApiResponse<User[]> = await fetch(...).then(r => r.json());`,
  },
];

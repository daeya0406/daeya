import { TestGroundDemo1, TestGroundDemo2, TestGroundDemo3 } from '../examples/testing';
import type { PlaygroundItem } from '@/types/playground';

const CustomButton = () => {
  return <button>Custom Button</button>;
};

export { CustomButton };

export const testingItems: PlaygroundItem[] = [
  {
    id: 'testing-3',
    title: '객체 리스트 CRUD 버튼 렌더링',
    tags: ['React'],
    description: 'React',
    categories: ['testing'],
    demo: <TestGroundDemo3 />,
    code: `const initialUsers = [
  { id: 1, name: 'A', age: 20 },
  { id: 2, name: 'B', age: 25 },
  { id: 3, name: 'C', age: 30 },
];

const [users, setUsers] = useState(initialUsers);

<section>
  <p>
    {users.map((u) => (
      <span key={u.id}>{u.name}</span>
    ))}
  </p>
  <div>
    <Button onClick={() => setUsers((prev) => [...prev, { id: 4, name: 'D', age: 35 }])}>
      추가
    </Button>
    <Button
      onClick={() =>
        setUsers((prev) =>
          prev.map((user) => (user.id === 1 ? { id: 1, name: 'Z', age: 15 } : user))
        )
      }
    >
      수정 (A를 Z로)
    </Button>
    <Button onClick={() => setUsers((prev) => prev.filter((user) => user.name !== 'B'))}>
      삭제 (B 제거)
    </Button>
    <Button onClick={() => setUsers((prev) => prev.filter((user) => user.age >= 25))}>
      필터 (나이 25 이상)
    </Button>
  </div>
</section>`,
  },
  {
    id: 'testing-2',
    title: '객체 리스트 CRUD',
    tags: ['JS'],
    description: 'JS',
    categories: ['testing'],
    demo: <TestGroundDemo2 />,
    code: `const users = [
  { id: 1, name: 'A', age: 20 },
  { id: 2, name: 'B', age: 25 },
  { id: 3, name: 'C', age: 30 },
];

// 1. 추가
const added = [...users, {id: 4, name: 'D', age: 35}];

// 2. 수정
const updated = users.map((user) => user.id === 1 ? {...user, age: 15} : user);

// 3. 삭제
const removed = users.filter((user) => user.id !== 2 );

// 4. 정렬
const sorted = users.filter((user) => user.age >= 25);`,
  },
  {
    id: 'testing-1',
    title: '객체 리스트 메서드',
    tags: ['JS'],
    description: '연습',
    categories: ['testing'],
    demo: <TestGroundDemo1 />,
    code: `const users = [
  { id: 1, name: 'A', age: 20 },
  { id: 2, name: 'B', age: 25 },
  { id: 3, name: 'C', age: 30 },
];

1.	map
    {users.map((user) => user.name).join(', ')}

2.	filter
    {users
      .filter((user) => user.age >= 25)
      .map((user) => user.name)
      .join(', ')}
  
3.	find
    {users.find((user) => user.age >= 25)?.name}

4.	추가
    {[...users, { id: 4, name: 'D', age: 35 }].map((user) => user.name).join(', ')}

5.	수정
    {users
      .map((user) => (user.id === 2 ? { ...user, name: 'Z', age: 40 } : user))
      .map((user) => user.name)
      .join(', ')}
  
6.	삭제
      {users
      .filter((user) => user.id !== 1)
      .map((user) => user.name)
      .join(', ')}`,
  },
];

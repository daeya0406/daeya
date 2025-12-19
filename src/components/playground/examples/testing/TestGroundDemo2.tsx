'use client';

import { Text } from '@/components/ui/Text';

const users = [
  { id: 1, name: 'A', age: 20 },
  { id: 2, name: 'B', age: 25 },
  { id: 3, name: 'C', age: 30 },
];

// 추가
const added = [...users, { id: 4, name: 'D', age: 35 }];

// 수정
const updated = users.map((user) => (user.id === 1 ? { ...user, age: 15 } : user));

// 삭제
const removed = users.filter((user) => user.id !== 2);

// 정렬
const sorted = users.filter((user) => user.age >= 25);

export default function TestGroundDemo2() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <section className="section-component">
        <Text.H6>1. 추가</Text.H6>
        {added.map((user) => user.name).join(', ')}
      </section>
      <section className="section-component">
        <Text.H6>2. 수정</Text.H6>
        {updated.map((user) => user.name).join(', ')}
      </section>
      <section className="section-component">
        <Text.H6>3. 삭제</Text.H6>
        {removed.map((user) => user.name).join(', ')}
      </section>
      <section className="section-component">
        <Text.H6>4. 정렬</Text.H6>
        {sorted.map((user) => user.name).join(', ')}
      </section>
    </div>
  );
}

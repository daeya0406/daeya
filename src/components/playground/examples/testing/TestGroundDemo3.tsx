'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
export default function TestGroundDemo3() {
  const initialUsers = [
    { id: 1, name: 'A', age: 20 },
    { id: 2, name: 'B', age: 25 },
    { id: 3, name: 'C', age: 30 },
  ];

  const [users, setUsers] = useState(initialUsers);

  return (
    <div>
      <section className="section-component space-y-2">
        <h6 className="text-md font-semibold">렌더링 화면</h6>
        <p>
          {users.map((u) => (
            <span key={u.id}>{u.name}</span>
          ))}
        </p>
        <div className="space-x-2">
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
      </section>
    </div>
  );
}

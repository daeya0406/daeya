'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/entities/profile/model/profile';

export default function FormPatternDemo() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    if (!email.includes('@')) {
      setError('올바른 이메일을 입력하세요.');
      return;
    }
    setError('');
    setSuccess('폼이 제출되었습니다!');
  };

  return (
    <form onSubmit={submit} className="flex flex-col space-y-3">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={PROFILE.email}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-emerald-600">{success}</p>}
      <Button type="submit">제출</Button>
    </form>
  );
}

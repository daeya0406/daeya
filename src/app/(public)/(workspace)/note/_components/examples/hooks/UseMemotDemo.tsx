'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/shared/ui/Input';

const hardSumCarculate = (number: number) => {
  console.log('어려운 계산');
  const start = performance.now();
  while (performance.now() - start < 500) {} // 0.5초 block
  return number + 1000;
};
const easySumCarculate = (number: number) => {
  console.log('쉬운 계산');
  return number + 10;
};

export default function UseMemoDemo() {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  const hardSum = useMemo(() => {
    return hardSumCarculate(hardNumber);
  }, [hardNumber]);
  // const hardSum = hardSumCarculate(hardNumber);
  const easySum = easySumCarculate(easyNumber);

  return (
    <div className="space-y-2">
      <div className="section-component space-y-2">
        <h6 className="text-md font-semibold">어려운 계산기</h6>
        <Input
          type="number"
          value={hardNumber}
          onChange={(e) => setHardNumber(Number(e.currentTarget.value))}
        />{' '}
        + 10000 = {hardSum}
      </div>
      <div className="section-component space-y-2">
        <h6 className="text-md font-semibold">쉬운 계산기</h6>
        <Input
          type="number"
          value={easyNumber}
          onChange={(e) => setEasyNumber(Number(e.currentTarget.value))}
        />{' '}
        + 10 = {easySum}
      </div>
    </div>
  );
}

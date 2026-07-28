'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getCareerChartData } from '@/content/registry';

type CareerChartProps = {
  compact?: boolean;
  className?: string;
};

export function CareerChart({ compact = false, className }: CareerChartProps) {
  const data = getCareerChartData();

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={compact ? 160 : 240}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: 'rgb(100 116 139)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: 'rgb(100 116 139)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(81, 137, 250, 0.08)' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid rgba(230,230,230,0.8)',
              background: 'rgb(var(--bg-depth-1))',
            }}
            labelStyle={{ color: 'rgb(30 41 56)' }}
          />
          <Bar dataKey="count" fill="rgb(81 137 250)" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

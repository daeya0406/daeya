import { TrendingUp, Code, Users } from 'lucide-react';
import { cardClassName } from './constants';

export function HomeStats() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <div className="text-primary bg-primary/10 mb-2 inline-flex rounded-xl p-3">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div className="text-foreground text-3xl font-bold">신입</div>
        <div className="text-muted-foreground mt-1 text-sm">프론트엔드 경력</div>
      </div>
      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <div className="text-primary bg-primary/10 mb-2 inline-flex rounded-xl p-3">
          <Code className="h-6 w-6" />
        </div>
        <div className="text-foreground text-3xl font-bold">15+</div>
        <div className="text-muted-foreground mt-1 text-sm">완료 프로젝트</div>
      </div>
      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <div className="text-primary bg-primary/10 mb-2 inline-flex rounded-xl p-3">
          <Users className="h-6 w-6" />
        </div>
        <div className="text-foreground text-3xl font-bold">5+</div>
        <div className="text-muted-foreground mt-1 text-sm">팀 협업 경험</div>
      </div>
    </div>
  );
}

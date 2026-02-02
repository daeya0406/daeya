import { Icon } from '@/shared/ui/Icons';
import { cardClassName } from './constants';

export function HomeStats() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <div className="text-primary bg-primary/10 mb-2 inline-flex rounded-xl p-3">
          <Icon name="trendingUp" size={24} />
        </div>
        <div className="text-foreground text-3xl font-bold">신입</div>
        <div className="text-muted-foreground mt-1 text-sm">프론트엔드 경력</div>
      </div>
      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <div className="text-primary bg-primary/10 mb-2 inline-flex rounded-xl p-3">
          <Icon name="users" size={24} />
        </div>
        <div className="text-foreground text-3xl font-bold">5+</div>
        <div className="text-muted-foreground mt-1 text-sm">퍼블리싱 경험</div>
      </div>
      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <div className="text-primary bg-primary/10 mb-2 inline-flex rounded-xl p-3">
          <Icon name="code" size={24} />
        </div>
        <div className="text-foreground text-3xl font-bold">3</div>
        <div className="text-muted-foreground mt-1 text-sm">완료 FE 프로젝트</div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { Badge } from '@/shared/ui/Badge';
import { DESIGN_INTRO, DESIGN_WORKS } from '@/content/work/design';
import { isOutboundHref } from '@/lib/utils';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-2xl shadow-sm ring-1';

function GuideLink({ href, className }: { href: string; className?: string }) {
  const outbound = isOutboundHref(href);
  const label = (
    <>
      가이드 보기 <Icon name={outbound ? 'externalLink' : 'arrowUpRight'} size={14} />
    </>
  );

  if (outbound) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function DesignWorkPage() {
  const [featured, ...rest] = DESIGN_WORKS;

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <header className="max-w-2xl space-y-3">
        <p className="text-muted-foreground text-sm font-medium">작업 · 프로덕트 디자인</p>
        <h1 className="text-foreground text-3xl font-bold">{DESIGN_INTRO.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{DESIGN_INTRO.description}</p>
      </header>

      {featured && (
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className={['overflow-hidden', cardClassName].join(' ')}>
            <div className="bg-depth-2 relative aspect-[4/3] overflow-hidden">
              {featured.image ? (
                <div className="absolute inset-x-16 bottom-0 top-4 sm:inset-x-20 sm:top-5">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-contain object-top drop-shadow-md"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              ) : (
                <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
                  <Icon name="imageOff" size={32} />
                </div>
              )}
            </div>
            <div className="space-y-4 p-6 lg:p-8">
              <div>
                <h2 className="text-foreground text-2xl font-bold">{featured.title}</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed">{featured.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <Badge key={tag} variant="subtle" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.links.prototype && (
                  <a
                    href={featured.links.prototype}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
                  >
                    프로토타입 <Icon name="externalLink" size={14} />
                  </a>
                )}
                {featured.links.github && (
                  <a
                    href={featured.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
                  >
                    GitHub <Icon name="github" size={14} />
                  </a>
                )}
              </div>
            </div>
          </article>

          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-bold">프로세스</h3>
            <ol className="space-y-3">
              {featured.process?.map((step, index) => (
                <li key={step} className={['flex gap-3 p-4', cardClassName].join(' ')}>
                  <span className="text-primary text-sm font-bold">{index + 1}</span>
                  <span className="text-muted-foreground text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="grid gap-6 md:grid-cols-2">
        {rest.map((work) => (
          <article
            key={work.id}
            className={['flex h-full flex-col p-5 sm:p-6', cardClassName].join(' ')}
          >
            <h3 className="text-foreground text-lg font-bold">{work.title}</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
              {work.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <Badge key={tag} variant="subtle" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {work.links.guide && (
                <GuideLink
                  href={work.links.guide}
                  className="text-primary inline-flex items-center gap-1 text-sm font-semibold"
                />
              )}
              {work.links.github && (
                <a
                  href={work.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm font-semibold"
                >
                  GitHub <Icon name="externalLink" size={12} />
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className={['p-6', cardClassName].join(' ')}>
        <p className="text-muted-foreground text-sm">
          컬러·폰트·UI 컴포넌트 상세는{' '}
          <Link href="/hobby/guide" className="text-primary font-semibold hover:underline">
            디자인 시스템
          </Link>
          에서 볼 수 있습니다.
        </p>
      </section>
    </div>
  );
}

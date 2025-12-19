import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ElementTag = React.ElementType;
type PolymorphicRef<C extends ElementTag> = React.ComponentPropsWithRef<C>['ref'];

const textVariants = cva('text-slate-900 dark:text-slate-100', {
  variants: {
    variant: {
      muted: 'text-muted-foreground',
      success: 'text-emerald-600 dark:text-emerald-400',
      danger: 'text-red-600 dark:text-red-400',
      primary: 'text-blue-600 dark:text-blue-400',
      strong: 'font-semibold',
      default: '',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'default',
  },
});

type TextProps<C extends ElementTag = 'p'> = {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'ref'> &
  VariantProps<typeof textVariants>;

type TextComponent = React.ForwardRefExoticComponent<
  TextProps<ElementTag> & React.RefAttributes<HTMLElement>
> & {
  displayName?: string;
} & Record<string, unknown>;

const Text = React.forwardRef<HTMLElement, TextProps<ElementTag>>(
  ({ as, className, variant, size, ...props }, ref) => {
    const Comp = (as ?? 'p') as ElementTag;
    return <Comp ref={ref} className={cn(textVariants({ variant, size }), className)} {...props} />;
  }
) as TextComponent;

Text.displayName = 'Text';

type BaseTypoProps = TextProps<ElementTag>;

const createTypo = (defaultTag: ElementTag, defaultClass: string) => {
  const Comp = React.forwardRef<HTMLElement, BaseTypoProps>(({ className, as, ...props }, ref) => (
    <Text
      ref={ref as PolymorphicRef<ElementTag>}
      as={as ?? (defaultTag as never)}
      className={cn(defaultClass, className)}
      {...props}
    />
  )) as TextComponent;

  Comp.displayName = `Typo.${typeof defaultTag === 'string' ? defaultTag : 'Custom'}`;
  return Comp;
};

const Typo = {
  h1: createTypo('h1', 'typo-h1'),
  h2: createTypo('h2', 'typo-h2'),
  h3: createTypo('h3', 'typo-h3'),
  h4: createTypo('h4', 'typo-h4'),
  h5: createTypo('h5', 'typo-h5'),
  h6: createTypo('h6', 'typo-h6'),
  bodyXl: createTypo('p', 'typo-body-xl'),
  bodyLg: createTypo('p', 'typo-body-lg'),
  bodyMd: createTypo('p', 'typo-body-md'),
  bodySm: createTypo('p', 'typo-body-sm'),
  bodyXs: createTypo('p', 'typo-body-xs'),
  body: createTypo('p', 'typo-body'),
  caption: createTypo('span', 'typo-caption'),
  overline: createTypo('span', 'typo-overline'),
};

const TextWithVariants = Text as TextComponent & typeof Typo & Record<string, TextComponent>;

TextWithVariants.H1 = Typo.h1;
TextWithVariants.H2 = Typo.h2;
TextWithVariants.H3 = Typo.h3;
TextWithVariants.H4 = Typo.h4;
TextWithVariants.H5 = Typo.h5;
TextWithVariants.H6 = Typo.h6;

TextWithVariants.Body16 = Typo.bodyLg;
TextWithVariants.Body14 = Typo.bodySm;
TextWithVariants.Caption = Typo.caption;
TextWithVariants.Body = Typo.body;
TextWithVariants.Overline = Typo.overline;
TextWithVariants.overline = Typo.overline;

const createScale = (sizeClass: string, leading = 'leading-tight') => {
  const Medium = createTypo('span', `${sizeClass} font-medium ${leading}`) as TextComponent & {
    Bold?: TextComponent;
  };
  const Bold = createTypo('span', `${sizeClass} font-bold ${leading}`);
  Medium.Bold = Bold;
  return Medium as TextComponent & { Bold: TextComponent };
};

TextWithVariants.S11 = createScale('text-[11px]');
TextWithVariants.S12 = createScale('text-[12px]');
TextWithVariants.S13 = createScale('text-[13px]');
TextWithVariants.S14 = createScale('text-[14px]');
TextWithVariants.S16 = createScale('text-[16px]');
TextWithVariants.S18 = createScale('text-[18px]');
TextWithVariants.S20 = createScale('text-[20px]');
TextWithVariants.S24 = createScale('text-[24px]');
TextWithVariants.S32 = createScale('text-[32px]');

export { TextWithVariants as Text, Typo, textVariants };

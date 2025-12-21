import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      muted: 'text-muted-foreground',
      success: 'text-emerald-600 dark:text-emerald-400',
      danger: 'text-red-600 dark:text-red-400',
      primary: 'text-primary',
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

type TextProps = {
  as?: React.ElementType;
  className?: string;
} & VariantProps<typeof textVariants> &
  React.HTMLAttributes<HTMLElement>;

type TextComponent = React.ForwardRefExoticComponent<
  TextProps & React.RefAttributes<HTMLElement>
> & {
  Bold?: TextComponent;
};

type TextScaleComponent = TextComponent & { Bold: TextComponent };

type TextStatics = {
  H1: TextComponent;
  H2: TextComponent;
  H3: TextComponent;
  H4: TextComponent;
  H5: TextComponent;
  H6: TextComponent;
  Body16: TextComponent;
  Body14: TextComponent;
  Caption: TextComponent;
  Overline: TextComponent;
  overline: TextComponent;
  S11: TextScaleComponent;
  S12: TextScaleComponent;
  S13: TextScaleComponent;
  S14: TextScaleComponent;
  S16: TextScaleComponent;
  S20: TextScaleComponent;
  S24: TextScaleComponent;
};

const TextBase = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Comp = 'p', className, variant, size, ...rest }, ref) => {
    return <Comp ref={ref} className={cn(textVariants({ variant, size }), className)} {...rest} />;
  }
) as TextComponent;

TextBase.displayName = 'Text';

const createToken = (
  tag: React.ElementType,
  className: string,
  displayName?: string
): TextComponent => {
  const Comp = React.forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
    ({ className: extra, ...rest }, ref) => (
      <TextBase as={tag} ref={ref} className={cn(className, extra)} {...rest} />
    )
  ) as TextComponent;
  if (displayName) {
    Comp.displayName = displayName;
  }
  return Comp;
};

const createScale = (className: string, label?: string): TextScaleComponent => {
  const Medium = createToken('span', `${className}`, label) as TextScaleComponent;
  Medium.Bold = createToken('span', `${className} font-bold`, label ? `${label}.Bold` : undefined);
  return Medium;
};

const TextWithVariants = TextBase as TextComponent & TextStatics;

// Headings
TextWithVariants.H1 = createToken('h1', 'text-3xl font-bold', 'Text.H1');
TextWithVariants.H2 = createToken('h2', 'text-2xl font-bold', 'Text.H2');
TextWithVariants.H3 = createToken('h3', 'text-xl font-semibold', 'Text.H3');
TextWithVariants.H4 = createToken('h4', 'text-2lg font-bold', 'Text.H4');
TextWithVariants.H5 = createToken('h5', 'text-lg font-semibold', 'Text.H5');
TextWithVariants.H6 = createToken('h6', 'text-md font-semibold', 'Text.H6');

// Body / Caption
TextWithVariants.Body16 = createToken('p', 'text-lg font-normal', 'Text.Body16');
TextWithVariants.Body14 = createToken('p', 'text-md font-normal', 'Text.Body14');
TextWithVariants.Caption = createToken('span', 'text-xs tracking-[0.01em]', 'Text.Caption');
TextWithVariants.Overline = createToken(
  'span',
  'text-xs font-semibold uppercase tracking-[0.08em]',
  'Text.Overline'
);
TextWithVariants.overline = TextWithVariants.Overline;

// Scale tokens
TextWithVariants.S11 = createScale('text-[11px] leading-[14px]', 'Text.S11'); // 11/14
TextWithVariants.S12 = createScale('text-xs leading-[14px]', 'Text.S12'); // 12/14
TextWithVariants.S13 = createScale('text-sm leading-[16px]'); // 13/16
TextWithVariants.S14 = createScale('text-md leading-[17px]'); // 14/17
TextWithVariants.S16 = createScale('text-lg leading-[19px]'); // 16/19
TextWithVariants.S20 = createScale('text-xl leading-[24px]', 'Text.S20'); // 20/24
TextWithVariants.S24 = createScale('text-2xl leading-[28px]', 'Text.S24'); // 24/28

export { TextWithVariants as Text, textVariants };

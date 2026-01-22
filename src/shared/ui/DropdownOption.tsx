'use client';

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export const DropdownOption = DropdownPrimitive.Root;
export const DropdownOptionTrigger = DropdownPrimitive.Trigger;

export function DropdownOptionContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Content>) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        {...props}
        className={cn(
          'border-border bg-background z-50 min-w-[160px] rounded-md border p-1 shadow-md',
          className
        )}
      />
    </DropdownPrimitive.Portal>
  );
}

export const DropdownOptionLabel = DropdownPrimitive.Label;
export const DropdownOptionSeparator = DropdownPrimitive.Separator;

export function DropdownOptionItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Item>) {
  return (
    <DropdownPrimitive.Item
      {...props}
      className={cn(
        'text-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-sm px-3 py-2 text-sm outline-none',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
    />
  );
}

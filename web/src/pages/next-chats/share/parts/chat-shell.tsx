import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode, Ref } from 'react';

type ChatShellProps = PropsWithChildren<{
  header: ReactNode;
  input: ReactNode;
  /**
   * Bind this to the scrolling element. The hook
   * `useSelectDerivedMessages` uses it to auto-scroll to bottom.
   * Typed as HTMLDivElement to match `messageContainerRef` from
   * `useSelectDerivedMessages`.
   */
  scrollContainerRef?: Ref<HTMLDivElement>;
  className?: string;
}>;

/**
 * Full-screen modern AI assistant shell for the public chat-share page.
 * Structure: sticky header on top, scrollable message area in the middle,
 * floating input pinned to the bottom with a gradient mask above it.
 */
export function ChatShell({
  header,
  input,
  scrollContainerRef,
  className,
  children,
}: ChatShellProps) {
  return (
    <div
      className={cn(
        'relative flex h-[100dvh] min-h-screen w-full flex-col overflow-hidden bg-bg-base text-text-primary',
        className,
      )}
    >
      {header}

      <div
        ref={scrollContainerRef}
        role="main"
        className="scrollbar-auto relative flex-1 overflow-y-auto"
      >
        <div className="mx-auto w-full max-w-3xl px-4 pb-32 pt-4 sm:px-6 sm:pt-6">
          {children}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg-base via-bg-base/95 to-transparent pb-3 pt-8 sm:pb-5 sm:pt-10">
        <div className="pointer-events-auto mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl bg-bg-base shadow-lg ring-1 ring-border-default transition-shadow focus-within:shadow-xl">
            {input}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      {/*
        Decorative background layer.
        Three large blurred orbs in different brand-adjacent colors give the
        page a "premium AI product" vibe without distracting from content.
        Sits BEHIND everything (z-0) and is ignored by pointer events.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,190,180,0.35),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(127,105,255,0.32),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,140,90,0.22),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg-base via-bg-base/90 to-transparent pb-5 pt-14 sm:pb-8 sm:pt-20">
          <div className="pointer-events-auto mx-auto w-full max-w-3xl px-4 sm:px-6">
            {/*
              Floating input composition:
              1. Soft drop-shadow ellipse beneath the card sells the levitation
                 effect on hover/focus.
              2. Inner card translates up a few pixels on hover/focus and uses
                 backdrop-blur to read as a glass plate floating over the
                 background orbs.
            */}
            <div className="group/input relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-full bg-black/25 blur-2xl transition-all duration-300 group-hover/input:inset-x-4 group-hover/input:-bottom-5 group-hover/input:bg-black/35 dark:bg-black/70 dark:group-hover/input:bg-black/80"
              />
              <div className="chat-share-input relative rounded-3xl border border-border-default/70 bg-bg-base/90 p-1 shadow-[0_10px_40px_-10px_rgb(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-[0_20px_50px_-12px_rgb(0,0,0,0.35)] focus-within:-translate-y-1 focus-within:border-accent-primary/50 focus-within:shadow-[0_24px_60px_-12px_rgb(0,190,180,0.35)] dark:bg-bg-base/60 dark:shadow-[0_10px_40px_-10px_rgb(0,0,0,0.7)] dark:hover:shadow-[0_20px_50px_-12px_rgb(0,0,0,0.8)] dark:focus-within:shadow-[0_24px_60px_-12px_rgb(0,190,180,0.5)]">
                {input}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

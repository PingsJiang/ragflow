import { RAGFlowAvatar } from '@/components/ragflow-avatar';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ShareHeaderProps = {
  title: string;
  avatar?: string;
  onReset: () => void;
  /** Hide the reset button when only the prologue is on screen — nothing to reset. */
  showReset?: boolean;
};

export function ShareHeader({
  title,
  avatar,
  onReset,
  showReset,
}: ShareHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border-default bg-bg-base/80 backdrop-blur supports-[backdrop-filter]:bg-bg-base/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <RAGFlowAvatar
            avatar={avatar}
            name={title}
            isPerson
            className="size-7 shrink-0"
          />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold text-text-primary">
              {title}
            </span>
            <span className="hidden truncate text-xs text-text-secondary sm:inline">
              {t('chat.share.subtitle')}
            </span>
          </div>
        </div>
        {showReset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="gap-1.5 text-text-secondary hover:text-text-primary"
          >
            <RefreshCcw className="size-3.5" />
            <span>{t('chat.share.reset')}</span>
          </Button>
        )}
      </div>
    </header>
  );
}

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ChatErrorBannerProps = {
  onRetry: () => void;
};

export function ChatErrorBanner({ onRetry }: ChatErrorBannerProps) {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-3 rounded-lg border border-state-error/30 bg-bg-card p-3 text-sm text-text-primary"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-state-error" />
      <div className="min-w-0 flex-1">
        <p className="font-medium">{t('chat.share.errorTitle')}</p>
        <p className="text-text-secondary">
          {t('chat.share.errorDescription')}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        {t('chat.share.retry')}
      </Button>
    </div>
  );
}

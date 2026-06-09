import { RAGFlowAvatar } from '@/components/ragflow-avatar';
import { useTranslation } from 'react-i18next';

type ChatHeroProps = {
  title: string;
  avatar?: string;
};

/**
 * First-screen welcome banner shown only when the conversation contains
 * the prologue message and nothing else. The prologue text itself is still
 * rendered by the first MessageItem below — this banner just sets the stage.
 */
export function ChatHero({ title, avatar }: ChatHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center gap-3 px-2 pb-2 pt-6 text-center sm:pt-10">
      <RAGFlowAvatar
        avatar={avatar}
        name={title}
        isPerson
        className="size-12 shadow-sm ring-1 ring-border-default"
      />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-text-secondary">
          {t('chat.share.heroSubtitle')}
        </p>
      </div>
    </section>
  );
}

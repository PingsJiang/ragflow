import { NextMessageInput } from '@/components/message-input/next';
import MessageItem from '@/components/message-item';
import PdfSheet from '@/components/pdf-drawer';
import { useClickDrawer } from '@/components/pdf-drawer/hooks';
import { useSyncThemeFromParams } from '@/components/theme-provider';
import { MessageType } from '@/constants/chat';
import { useFetchExternalChatInfo } from '@/hooks/use-chat-request';
import i18n, { changeLanguageAsync } from '@/locales/config';
import { buildMessageUuidWithRole } from '@/utils/chat';
import React, { forwardRef, useMemo } from 'react';
import { useSendButtonDisabled } from '../hooks/use-button-disabled';
import {
  useGetSharedChatSearchParams,
  useSendSharedMessage,
} from '../hooks/use-send-shared-message';
import { buildMessageItemReference } from '../utils';
import { ChatErrorBanner } from './parts/chat-error-banner';
import { ChatHero } from './parts/chat-hero';
import { ChatShell } from './parts/chat-shell';
import { ShareHeader } from './parts/share-header';

const ChatContainer = () => {
  const {
    sharedId: conversationId,
    locale,
    theme,
    visibleAvatar,
  } = useGetSharedChatSearchParams();
  useSyncThemeFromParams(theme);
  const { visible, hideModal, documentId, selectedChunk, clickDocumentButton } =
    useClickDrawer();

  const {
    handlePressEnter,
    handleInputChange,
    value,
    sendLoading,
    derivedMessages,
    hasError,
    stopOutputMessage,
    scrollRef,
    messageContainerRef,
    removeAllMessagesExceptFirst,
  } = useSendSharedMessage();
  const sendDisabled = useSendButtonDisabled(value);
  const { data: chatInfo } = useFetchExternalChatInfo();

  React.useEffect(() => {
    if (locale && i18n.language !== locale) {
      changeLanguageAsync(locale);
    }
  }, [locale, visibleAvatar]);

  const avatarDialogSrc = chatInfo.avatar;

  const isHero = useMemo(
    () =>
      (derivedMessages?.length ?? 0) === 1 &&
      derivedMessages?.[0]?.role === MessageType.Assistant,
    [derivedMessages],
  );

  if (!conversationId) {
    return <div>empty</div>;
  }

  return (
    <>
      <ChatShell
        scrollContainerRef={messageContainerRef}
        header={
          <ShareHeader
            title={chatInfo.title}
            avatar={chatInfo.avatar}
            onReset={removeAllMessagesExceptFirst}
            showReset={(derivedMessages?.length ?? 0) > 1}
          />
        }
        input={
          <NextMessageInput
            isShared
            value={value}
            disabled={hasError}
            sendDisabled={sendDisabled}
            resize="vertical"
            conversationId={conversationId}
            onInputChange={handleInputChange}
            onPressEnter={handlePressEnter}
            sendLoading={sendLoading}
            uploadMethod="external_upload_and_parse"
            showUploadIcon={false}
            stopOutputMessage={stopOutputMessage}
            showReasoning
            showInternet={chatInfo?.has_tavily_key}
          />
        }
      >
        {/*
          The `chat-share-root` class scopes a few overrides in tailwind.css
          to the share-chat MessageItem bubbles (depends on the message-item
          less-module class names — see tailwind.css for the selectors).
        */}
        <div className="chat-share-root">
          {isHero && (
            <ChatHero title={chatInfo.title} avatar={chatInfo.avatar} />
          )}
          {hasError && (
            <ChatErrorBanner onRetry={removeAllMessagesExceptFirst} />
          )}
          {derivedMessages?.map((message, i) => (
            <MessageItem
              visibleAvatar={visibleAvatar}
              key={buildMessageUuidWithRole(message)}
              avatarDialog={avatarDialogSrc}
              item={message}
              nickname="You"
              reference={buildMessageItemReference(
                {
                  messages: derivedMessages,
                  reference: [],
                },
                message,
              )}
              loading={
                message.role === MessageType.Assistant &&
                sendLoading &&
                derivedMessages?.length - 1 === i
              }
              index={i}
              clickDocumentButton={clickDocumentButton}
              showLikeButton={false}
              showLoudspeaker={false}
            />
          ))}
          <div ref={scrollRef} />
        </div>
      </ChatShell>
      {visible && (
        <PdfSheet
          visible={visible}
          hideModal={hideModal}
          documentId={documentId}
          chunk={selectedChunk}
        />
      )}
    </>
  );
};

export default forwardRef(ChatContainer);

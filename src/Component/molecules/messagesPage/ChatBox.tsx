import { FormEvent, ReactNode, useEffect, useMemo, useRef } from "react";
import { IGroupedMessages, IMessage } from "../../../hooks/useMessages";
import ChatBubble from "./ChatBubble";
import Spinner from "../../atoms/spinner";
import { BiSolidSend } from "react-icons/bi";
import { useMessageStore } from "../../../store/useMessagesStore";

export default function ChatBox({
  messages: _messages,
  activeMessage,
  submitMessage,
  setNewMessage,
  newMessage,
}: {
  messages: IGroupedMessages;
  activeMessage: string;
  submitMessage: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  newMessage: string;
}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const messages = useMemo(() => _messages, [_messages]);
  const repliedId = useMessageStore((state) => state.repliedId);
  const replyMessage = messages[activeMessage]?.messages?.find((msg) => msg._id === repliedId) || null;

  useEffect(() => {
    if (containerRef.current) {
      const timeoutId = setTimeout(() => {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [containerRef, messages]);

  return (
    <div
      className={`tw-w-1/2 tw-bg-white tw-border tw-rounded-md tw-overflow-auto tw-flex tw-flex-col tw-relative tw-min-h-full`}
      ref={containerRef}
    >
      <div className="tw-h-max tw-w-full tw-pb-8 tw-p-2 ">
        {messages[activeMessage]?.messages?.map((message, index) => (
          <ChatBubble key={index} message={message} messages={messages} activeMessage={activeMessage} />
        ))}

        {/* {!messages[activeMessage] && <Spinner />} */}
      </div>

      <form
        onSubmit={submitMessage}
        className={`tw-p-2  tw-flex tw-flex-col tw-items-center tw-mt-auto tw-sticky tw-bottom-0 tw-inset-x-0 tw-gap-2 tw-rounded-md tw-transition-all ${
          !!replyMessage ? " tw-bg-gray-100 tw-border " : "tw-bg-white"
        }`}
      >
        {replyMessage && (
          <div className="tw-border tw-border-l-4 tw-border-l-primary tw-rounded-md tw-p-2 tw-bg-white tw-w-full tw-flex tw-flex-row">
            <p className="tw-mb-0">{replyMessage.message}</p>
            {/* remove reply id button */}
            <button
              className="tw-ml-auto tw-text-gray-500 tw-text-xs tw-font-bold hover:tw-text-gray-600"
              onClick={() => useMessageStore.getState().setRepliedId("")}
            >
              Remove
            </button>
          </div>
        )}
        <div className="tw-flex tw-flex-row tw-w-full">
          <input
            className="tw-flex-grow tw-border tw-rounded tw-p-2 tw-border-gray-200"
            placeholder="Send Messages"
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                submitMessage(e);
              }
            }}
            value={newMessage}
          />
          <button
            type="submit"
            className="tw-ml-2 tw-bg-primary tw-text-primary-content tw-px-4 tw-py-2 tw-rounded tw-cursor-pointer"
            disabled={!newMessage}
            title="Send Message"
          >
            <BiSolidSend className=" tw-fill-white" />
          </button>
        </div>
      </form>
    </div>
  );
}

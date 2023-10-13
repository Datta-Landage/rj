import { useMemo } from "react";
import { IGroupedMessages, IMessage } from "../../../hooks/useMessages";
import { useMessageStore } from "../../../store/useMessagesStore";
import { LuReply } from "react-icons/lu";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  message: IMessage;
  messages: IGroupedMessages;
  activeMessage: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, activeMessage, messages, ...props }) => {
  const isSender = message.senderId === activeMessage;
  const repliedMessage = useMemo(
    () => messages[activeMessage]?.messages?.find((msg) => msg._id === message?.repliedId),
    [activeMessage, message, messages],
  );

  const setRepliedId = useMessageStore((state) => state.setRepliedId);

  const replyBtn = () => (
    <button onClick={() => setRepliedId(message._id)} title={"Reply to this message"}>
      <LuReply />
    </button>
  );

  return (
    <div
      className={`tw-scroll-m-28 tw-flex tw-flex-col tw-gap-1 tw-p-2 tw-rounded-md ${
        isSender ? "tw-items-start" : "tw-items-end"
      }`}
      id={`message-${message._id}`}
      {...props}
    >
      {repliedMessage && (
        <a href={`#message-${repliedMessage._id}`} className="tw-border tw-rounded-md tw-p-2 tw-bg-gray-100">
          <p className="tw-mb-0">{repliedMessage.message}</p>
        </a>
      )}
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
        {isSender && (
          <div className=" tw-h-8 tw-w-8 tw-aspect-square tw-rounded-full tw-bg-gray-200 tw-my-auto tw-flex">
            <span className="tw-m-auto">{(message.senderName || "")[0]}</span>
          </div>
        )}

        {isSender && replyBtn()}

        <div
          className={`tw-flex tw-flex-col tw-gap-1 tw-p-2 tw-rounded-md ${
            !isSender ? "tw-bg-primary/10" : "tw-bg-gray-100"
          }`}
        >
          <p className="tw-mb-0">{message.message}</p>
          <span className="tw-text-xs tw-text-gray-400">
            {!!message?.timestamp ? new Date(message?.timestamp).toLocaleString() : ""}
          </span>
        </div>

        {!isSender && replyBtn()}
      </div>
    </div>
  );
};

export default ChatBubble;

import { useMessageStore } from "../../../store/useMessagesStore";
import Avatar from "../../atoms/Avatar";

const MessageItem = ({
  senderName,
  message,
  isActive,
  ...props
}: { senderName: string; message?: string; isActive: boolean } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={`tw-w-full   hover:tw-bg-primary/10  tw-transition-all tw-flex tw-flex-row tw-gap-4 tw-px-3 tw-py-2 tw-cursor-pointer active:tw-bg-primary/20 tw-rounded-md tw-bg-white ${
        isActive ? "tw-border-primary tw-border" : ""
      }`}
      {...props}
    >
      <Avatar senderName={senderName} />
      <div className="tw-flex tw-flex-col">
        <h3 className="tw-text-base tw-text-primary tw-font-bold tw-mb-0 tw-truncate tw-my-auto">{senderName}</h3>
        {!!message && <p className="tw-mb-0 tw-text-left tw-text-sm tw-text-gray-900 tw-truncate">{message}</p>}
      </div>
    </button>
  );
};

export default MessageItem;

import { useState, useEffect } from "react";
import { API } from "../utils/api";
import { useMessageStore } from "../store/useMessagesStore";
import { useUserStore } from "../store/useUserStore";

export interface IGroupedMessages {
  [key: string]: {
    messages: IMessage[];
    senderName: string;
    unseenMessages: number;
    lastUnseenMessageId: string;
  };
}

export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  message: string;
  seen: boolean;
  timestamp: string;
  repliedId?: string;
  __v: number;
}

export const useMessages = () => {
  const messages = useMessageStore((state) => state.messages);
  const setStoreMessages = useMessageStore((state) => state.setMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const userId = useUserStore((s) => s?.user?._id);

  const fetchMessages = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(API.getMessages(userId));
      const data: IGroupedMessages = await response.json();

      if (JSON.stringify(messages) !== JSON.stringify(data)) {
        setStoreMessages(data); // Use Zustand to set the messages in the store
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return { messages, isLoading, error, fetchMessages };
};

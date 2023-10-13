import { create } from "zustand";
import { IGroupedMessages } from "../hooks/useMessages";
import { IProfile } from "../Pages/AllCandidates";

type MessageState = {
  messages: IGroupedMessages;
  setMessages: (messages: IGroupedMessages) => void;

  selectedProfile: IProfile;
  setSelectedProfile: (profile: IProfile) => void;

  activeMessage: string;
  setActiveMessage: (message: string) => void;

  repliedId: string;
  setRepliedId: (id: string) => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  messages: {},
  setMessages: (messages) => set({ messages }),

  selectedProfile: {} as IProfile,
  setSelectedProfile: (profile) => set({ selectedProfile: profile }),

  activeMessage: "",
  setActiveMessage: (message) => set({ activeMessage: message }),

  repliedId: "",
  setRepliedId: (id) => set({ repliedId: id }),
}));

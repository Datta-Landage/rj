import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import Layout from "../../Component/Layout";
import "./Css/CreateAccount.css";
import Accountbtn from "./AccountButtons";
import "../Css/All.css";
import { FiSearch } from "react-icons/fi";
import { API } from "../../utils/api";
import { IGroupedMessages, useMessages } from "../../hooks/useMessages";
import Spinner from "../../Component/atoms/spinner";
import ChatBox from "../../Component/molecules/messagesPage/ChatBox";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useMessageStore } from "../../store/useMessagesStore";
import MessageItem from "../../Component/molecules/messagesPage/MessageItem";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-toastify";
import { USER_TYPE } from "../../hooks/useUserInfo";

function MessagePage() {
  const selectedProfile = useMessageStore((state) => state.selectedProfile);
  const setSelectedProfile = useMessageStore((state) => state.setSelectedProfile);
  const { messages, isLoading, fetchMessages } = useMessages();
  const [filteredMessages, setFilteredMessages] = useState<IGroupedMessages>({});
  const activeMessage = useMessageStore((state) => state.activeMessage);
  const setActiveMessage = useMessageStore((state) => state.setActiveMessage);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const repliedId = useMessageStore((state) => state.repliedId);
  const setRepliedId = useMessageStore((state) => state.setRepliedId);

  const [newMessage, setNewMessage] = useState<string>("");

  const handleMessageFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase();
      if (searchValue.length === 0) {
        setFilteredMessages(messages);
        return;
      }

      const filtered = Object.entries(messages).reduce((acc, [senderId, messageGroup]) => {
        const filteredMessagesForSender = messageGroup.messages.filter((message) =>
          message.senderName.toLowerCase().includes(searchValue),
        );

        if (filteredMessagesForSender.length) {
          acc[senderId] = {
            ...messageGroup,
            messages: filteredMessagesForSender,
          };
        }

        return acc;
      }, {});

      setFilteredMessages(filtered);
    },
    [messages],
  );

  const submitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(API.sendMessage(user?._id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: activeMessage,
          message: newMessage,
          repliedId: repliedId,
        }),
      });

      const data = await response.json(); // Use a type assertion here if you know the expected response type
      console.log(data);
      setNewMessage("");
      fetchMessages();
      setSelectedProfile(null);
      setRepliedId("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    !activeMessage && setActiveMessage(messages && Object.keys(messages)[0]);
    setFilteredMessages({
      ...messages,
      ...(!!selectedProfile?.candidateId
        ? {
            [selectedProfile.candidateId]: {
              senderName: selectedProfile.name,
              messages: [],
              lastUnseenMessageId: "",
              unseenMessages: 0,
            },
          }
        : {}),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading]);

  useEffect(() => {
    if (!user?._id) {
      toast.warning("Please Login First !", {
        position: "top-center",
        theme: "light",
      });
      navigate(ROUTES.SIGN_IN);
    }
  }, [user]);

  // if (isLoading && !Object.keys(messages).length) {
  //   return (
  //     <Layout title={"Message"}>
  //       <div className="container py-4">
  //         <div className="d-flex">
  //           <Accountbtn />

  //           <div className="container mx-4 d-flex tw-gap-3 tw-max-h-[500px]">
  //             <Spinner />
  //           </div>
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout title={"Message"}>
      <div className="container py-4">
        <div className="d-flex">
          <Accountbtn />

          <div className="container mx-4 d-flex tw-gap-3 tw-max-h-[500px]">
            <div className="tw-flex tw-flex-col tw-bg-white tw-border tw-rounded-md tw-p-2">
              <h1 className="tw-text-primary tw-text-2xl">Messages</h1>
              <div className="tw-w-1/4">
                <div className="tw-flex tw-items-center tw-mb-4">
                  <input
                    className="tw-flex-grow tw-border tw-rounded-l tw-h-10 tw-p-2 tw-border-primary"
                    placeholder="Enter Name"
                    onChange={handleMessageFilter}
                  />
                  <button className="tw-bg-primary tw-text-primary-content tw-h-10 tw-px-4 tw-py-2 tw-rounded-r">
                    Search
                  </button>
                </div>
              </div>

              <div className="tw-gap-2 tw-flex tw-flex-col tw-overflow-auto">
                {Object.keys(filteredMessages)?.map((senderId: string, index: number) => {
                  const senderName = filteredMessages[senderId]?.senderName || "";
                  const message = filteredMessages[senderId]?.messages?.[0]?.message || "";

                  return (
                    <MessageItem
                      key={index}
                      senderName={senderName}
                      message={message}
                      onClick={() => setActiveMessage(senderId)}
                      isActive={senderId === activeMessage}
                    />
                  );
                })}
              </div>
              {user?.accountType?.toLowerCase() === USER_TYPE.RECRUITER.toLowerCase() && (
                <Link to={ROUTES.ALL_CANDIDATES}>
                  <button className="tw-w-full tw-mt-4 tw-border tw-border-primary hover:tw-bg-primary/90 tw-bg-primary tw-text-white tw-cursor-pointer tw-transition-all tw-flex tw-flex-row tw-gap-2 tw-px-3 tw-py-2 active:tw-bg-primary/80 tw-rounded-md tw-no-underline">
                    New Message
                  </button>
                </Link>
              )}
            </div>

            <ChatBox
              messages={messages}
              activeMessage={activeMessage}
              submitMessage={submitMessage}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MessagePage;

import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

import { TiMessages } from "react-icons/ti";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";
import leftIcon from "../../assets/images/left-icon.svg"


const MessageContainer = () => {
  const { messages, selectedConversation, setSelectedConversation, currentSection, setCurrentSection } = useConversation();
  const { messages: newMessages } = useGetMessages();
  useListenMessages();
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  const handleBackClick = () => {
    setCurrentSection("sidebar");
  }

  useEffect(() => {

  }, [messages])
  return (
    <div className={`md:min-w-[450px] max-w-[450px] ${currentSection !== "messageContainer" ? "hidden md:flex" : "flex"}  flex-col bg-[#FFFFFF] rounded-xl drop-shadow`}>
      <>
        {selectedConversation && (
          <div className=" border-b border-gray-200 px-4 py-2 mb-2 flex items-center gap-2">
            <span
              className="cursor-pointer md:hidden"
              onClick={handleBackClick}
            >
              <img src={leftIcon} alt="" />
            </span>
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation?.fullName}
            </span>
          </div>
        )}
        {
          !selectedConversation ? (
            <NoChatSelected />
          ) : (
              <>
                <Messages messages={newMessages} />
                <MessageInput />
              </>
            )
        }

      </>
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-[#303030] font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation, currentSection, setCurrentSection } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [isSelected, setIsSelected] = useState(false);
  const isOnline = onlineUsers.includes(conversation?._id);
  useEffect(() => {
    setIsSelected(conversation?._id === selectedConversation?._id);
  }, [conversation?._id, selectedConversation]);

  const handleConversationClick = () => {
    setSelectedConversation(conversation)
    setCurrentSection("messageContainer");
  }
  
  return (
    <>
      <div
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500 hover:bg-sky-500 cursor-auto" : "hover:bg-gray-200"}`}
        onClick={() => handleConversationClick()}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className={`font-bold  ${isSelected ? "text-[#303030]" : "text-[#303030]"}`}>{conversation?.fullName}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;

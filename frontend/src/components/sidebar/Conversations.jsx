import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto max-h-full">
      {conversations?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;

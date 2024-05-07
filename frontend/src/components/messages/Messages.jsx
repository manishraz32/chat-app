import { useEffect, useRef } from "react";
import Message from "./Message";
// import useGetMessages from "../../hooks/useGetMessages";
const Messages = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.length == 0 ? (
        <h4 class="text-xs text-gray-700 text-center">there is not any message. Type something to start message</h4>
      ) : (
        messages.map((message) => (
          <div key={message._id} ref={messageRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};
export default Messages;

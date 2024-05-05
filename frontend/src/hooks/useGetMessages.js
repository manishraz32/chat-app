import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (data.error) return new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(selectedConversation) getAllMessages();
  }, [selectedConversation, setMessages, selectedConversation?._id]);

  return { loading, messages };
};

export default useGetMessages;

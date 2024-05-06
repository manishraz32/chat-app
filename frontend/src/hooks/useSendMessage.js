import {useState} from 'react'
import useConversation from '../zustand/useConversation'
import { toast } from "react-hot-toast";

const useSendMessage = () => {
  const {setMessages, selectedConversation} = useConversation();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);

    try {
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        
        if(data.error) return new Error(data.error);
        const messagesResponse = await fetch(`/api/messages/${selectedConversation._id}`);
        const messagesData = await messagesResponse.json();

        if (messagesData.error) return new Error(data.error);
        setMessages(messagesData);
    } catch(error) {
        toast(error.message);
    } finally {
        setLoading(false);
    }
  }

  return {loading, sendMessage};
}

export default useSendMessage

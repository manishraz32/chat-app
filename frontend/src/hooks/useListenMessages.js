import {useEffect} from 'react'
import useConversation from "../zustand/useConversation"
import { useSocketContext } from '../context/SocketContext';

import notificationSound from "../assets/message-sound.mp3";

const useListenMessages = () => {
    const {messages, setMessages} = useConversation();
    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        })

        return () => {
            socket?.off("newMessage");
        }
    }, [socket, messages, setMessages]);
}

export default useListenMessages;

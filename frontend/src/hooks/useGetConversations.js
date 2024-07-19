import { useState, useEffect } from 'react';
import {toast} from "react-hot-toast";

const useGetConversations =  () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem('chat-user'));
    useEffect(() => {
        const getConversations =  async () => {
            setLoading(true);
            try {
                const res = await fetch(`api/users/${loggedInUser._id}/friends`);
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                console.log('friends', data);
                setConversations(data);
            } catch (error) {
                toast(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    }, [])
    return { loading, conversations };
}

export default useGetConversations;
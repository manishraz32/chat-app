import {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
const useSendRequest = () => {
    const [loading, setLoading] = useState(false);
    
    const sendRequest = async (senderId, receiverId) => {
        console.log("sendRequest", senderId, receiverId);
        setLoading(true);
        try {
            const res = await fetch(`/api/friendRequest/makerequest`, {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    senderId: senderId,
                    receiverId: receiverId
                })
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            return true;
        } catch(error) {
            console.log("error", error);
            // toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    return {sendRequest, loading};
}

export default useSendRequest;
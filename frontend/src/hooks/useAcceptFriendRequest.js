import { useState } from 'react'
import toast from 'react-hot-toast'
const useAcceptFriendRequest = () => {
    const [loading, setLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
   
    const acceptFriendRequest = async (currenUser, senderUser) => {
        setLoading(true);
        try {
            const res = await fetch(`api/friendRequest/acceptrequest`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "senderId": senderUser,
                    "receiverId": currenUser
                })
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("friend request accepted");
        } catch (error) {
            toast.error("failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const rejectFriendRequest = async (currenUser, senderUser) => {
        setRejectLoading(true)
        try {
            const res = await fetch(`api/friendRequest/rejectrequest`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "senderId": senderUser,
                    "receiverId": currenUser
                })
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("friend request rejected");
        } catch (error) {
            toast.error("rejection failed");
            console.log(error);
        } finally {
            setRejectLoading(false);
        }
    }


    return { loading, acceptFriendRequest, rejectFriendRequest }
}

export default useAcceptFriendRequest;
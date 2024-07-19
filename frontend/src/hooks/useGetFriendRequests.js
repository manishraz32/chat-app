import {useState, useEffect} from 'react'

const useGetFriendRequests = (currentUserId) => {
 const [loading, setLoading] = useState(false);
 const [requests, setRequests] = useState([]);
 console.log("currentUserId", currentUserId);
 useEffect(() => {
    const getAllFriendRequests = async () => {
        try {
            const res = await fetch(`api/users/${currentUserId}/friends-requests`);
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            setRequests(data);
        } catch(error) {
            console.log(error);
        }
    }
    getAllFriendRequests();
 }, []);

 return {loading, requests};
}

export default useGetFriendRequests
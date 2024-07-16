import {useState, useEffect} from 'react'

const useGetSuggestedFriend = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestedFriends = async () => {
    try {
        const res = await fetch(`/api/users`);
        const data = await res.json();
        if (data.error) return new Error(data.error);
        setSuggestedFriends(data);
    } catch(error) {
        toast(error.message);
    } finally {
        setLoading(false);
    }
}
  useEffect(() => {
    getSuggestedFriends();
  }, []);


  return {refetch: getSuggestedFriends, suggestedFriends, loading};
}

export default useGetSuggestedFriend
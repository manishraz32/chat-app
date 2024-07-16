import React, {useState, useEffect} from 'react'
import AddFriend from './AddFriend';
import useGetSuggestedFriend from '../../hooks/useGetSuggestedFriend';
import useSendRequest from '../../hooks/useSendRequest';

const AddFriends = () => {
  const {refetch,  suggestedFriends, loading } = useGetSuggestedFriend();
  const [localSuggestedFriend, setLocalSuggestedFriends] = useState(suggestedFriends);
  const {sendRequest, loading:friendRequestLoading} = useSendRequest();
  const currentUser = JSON.parse(localStorage.getItem("chat-user"));
  console.log("localSuggestedFriend", localSuggestedFriend);
  console.log("suggestedFriends", suggestedFriends);
  useEffect(() => {
    setLocalSuggestedFriends(suggestedFriends);
  }, [suggestedFriends]);
  const getSuggestedFriends = async () => {
    try {
        const res = await fetch(`/api/users`);
        const data = await res.json();
        if (data.error) return new Error(data.error);
        setLocalSuggestedFriends(data);
    } catch(error) {
    } finally {
    }
}

  const handleAddFriendClick = async (receiverid) => {
   await sendRequest(currentUser._id, receiverid);
   getSuggestedFriends();
  }

  return (
    <div className="flex flex-col gap-4">
      {
        localSuggestedFriend.map(({ fullName, profilePic, _id }) => (
          <AddFriend
            userId = {_id}
            fullName={fullName}
            profilePic={profilePic}
            handleAddFriendClick={handleAddFriendClick}
          />
        ))
      }
    </div>
  )
}

export default AddFriends
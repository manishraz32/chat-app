import React from 'react'
import FriendRequest from './FriendRequest'
import useGetFriendRequests from '../../hooks/useGetFriendRequests'
import useAcceptFriendRequest from '../../hooks/useAcceptFriendRequest';

const FriendRequests = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('chat-user'));
  const { loading, requests } = useGetFriendRequests(loggedInUser._id);
  const { acceptFriendRequest } = useAcceptFriendRequest();
  console.log("loggedInUser", loggedInUser);
  console.log("requests", requests);
  return (
    <div>
      {
        requests.map(({ _id, fullName, profilePic }) => (
          <FriendRequest
            key={_id}
            id={_id}
            name={fullName}
            profilePic={profilePic}
            acceptRequest = {() => acceptFriendRequest(loggedInUser._id, _id)}
          />
        ))
      }
    </div>
  )
}

export default FriendRequests
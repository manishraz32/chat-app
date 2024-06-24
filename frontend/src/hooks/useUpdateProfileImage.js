import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useUpdateProfileImage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const updateProfilePic = async (profilePic, retries = 3) => {
        console.log("profilePic in hook", profilePic);
        setLoading(true);

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const res = await fetch(`http://localhost:3000/api/profile/updateProfilePic/${authUser._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ profilePic }),
                });

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Failed to update profile picture');
                }

                const data = await res.json();
                console.log("Response data:", data);

                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("Profile picture updated successfully!");
                return;  // Exit the function if successful
            } catch (error) {
                console.error(`Attempt ${attempt} failed:`, error);
                if (attempt === retries) {
                    toast.error(error.message);
                }
            }
        }

        setLoading(false);
    };

    return { loading, updateProfilePic };
};

export default useUpdateProfileImage;

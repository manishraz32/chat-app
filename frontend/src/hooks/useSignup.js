import {useState} from 'react';
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});

        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            });
            console.log("res signup", res);
            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }

            // set user's detail into local storage 
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup};
}

const handleInputErrors = ({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Password do not match");
        return false;
    }

    if(password.length < 6) {
        toast.error("password must be at least 6 characters");
    }

    return true;
}

export default useSignup

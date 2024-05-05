import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({username, password}) => {
    const validate = validateLoginInData({username, password});
    if(!validate) return;
    setLoading(true);
    try {
      const res = await fetch("api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password})
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const validateLoginInData = ({username, password}) => {
    if(!username || !password) {
        toast.error("values can't be empty");
        return false;
    }

    if(password.length < 6) {
        toast.error("password must be atleast 6 character");
        return false;
    }

    return true;
}

export default useLogin;

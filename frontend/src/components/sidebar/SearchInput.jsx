import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.length < 3) {
      toast.error("search text must be 3 character");
      return;
    }
    const conversation = conversations.find((conversation) =>
      conversation?.fullName?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSelectedConversation(conversation);
    setSearchInput("");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full bg-[#EFF6FC]"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;

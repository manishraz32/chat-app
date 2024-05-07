import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
const Sidebar = () => {
	const { currentSection, setCurrentSection } = useConversation();

	return (
		<div className={`bg-[#FFFFFF] border-slate-500 p-4 ${currentSection !== "sidebar" ? "hidden md:flex" : "flex"} flex-col drop-shadow rounded-xl`}>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<div className="mt-4">
				<LogoutButton />
			</div>
		</div>
	);
};
export default Sidebar;
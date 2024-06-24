import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import SidebarTop from "./SidebarTop";
import useGlobalData from "../../zustand/useGlobalData";
import ProfilePage from "./ProfilePage";

const Sidebar = () => {
	const { currentSection, setCurrentSection } = useConversation();
	const { isDrowerOpen } = useGlobalData();
	console.log("isDrowerOpen", isDrowerOpen);
	return (
		<div className={`bg-[#FFFFFF] border-slate-500 p-4 ${currentSection !== "sidebar" ? "hidden md:flex" : "flex"} flex-col drop-shadow rounded-xl`}>
			{isDrowerOpen && <ProfilePage />}
			{!isDrowerOpen && <>
				<SidebarTop />
				{/* search input box cause sidebar width more */}
				<SearchInput />
				<div className='divider px-3'></div>
				<Conversations />
				<div className="mt-4">
					<LogoutButton />
				</div>
			</>}
		</div>
	);
};
export default Sidebar;
import { create } from "zustand";

const useGlobalData = create((set) => ({
    isDrowerOpen: false,
    setIsDrowerOpen: (isDrowerOpen) => {
        set({ isDrowerOpen })
    },
    selectedTab: 'friends',
    setSelectedTab: (selectedTab) => {
        set({selectedTab})
    }
}))


export default useGlobalData;